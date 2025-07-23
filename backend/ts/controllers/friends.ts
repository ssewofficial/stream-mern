import Friends from "../model/friends.js";
import { Route } from "../types.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import User from "../model/user.js";

export const createFriendship: Route = async (req, res) => {
  const { friendId } = req.body;
  const userId = req.user._id;

  if (!userId || !friendId) {
    return res
      .status(400)
      .json({ message: "User ID and Friend ID are required." });
  }

  try {
    const friendship = new Friends({ userId, friendId });
    await friendship.save();
    res.status(201).json(friendship);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating friendship.", error });
  }
};

export const acceptFriendship: Route = async (req, res) => {
  const { friendId } = req.body;

  try {
    const friendship = await Friends.findOneAndUpdate(
      { userId: friendId, friendId: req.user._id, status: "pending" },
      { status: "accepted" },
      { new: true }
    );

    if (!friendship) {
      return res
        .status(404)
        .json({ message: "Friendship request not found or already accepted." });
    }

    const recieverSocketId = getRecieverSocketId(friendId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("friendAccepted", friendship);
    }
    res.status(200).json(friendship);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error accepting friendship.", error });
  }
};

export const rejectFriendship: Route = async (req, res) => {
  const { friendId } = req.body;
  try {
    const friendship = await Friends.findOneAndDelete({
      $or: [
        { userId: req.user._id, friendId: friendId, status: "pending" },
        { userId: friendId, friendId: req.user._id, status: "pending" },
      ],
    });

    if (!friendship) {
      return res.status(404).json({ message: "Friendship request not found." });
    }

    return res.status(200).json({ message: "Friendship request rejected." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error rejecting friendship.", error });
  }
};

export const blockFriendship: Route = async (req, res) => {
  const { friendId } = req.body;
  try {
    const friendship = await Friends.findOneAndUpdate(
      {
        $or: [
          { userId: req.user._id, friendId: friendId, status: "accepted" },
          { userId: friendId, friendId: req.user._id, status: "accepted" },
        ],
      },
      { status: "blocked" },
      { new: true }
    );

    if (!friendship) {
      return res
        .status(404)
        .json({ message: "Friendship not found or already blocked." });
    }

    const receiverSocketId = getRecieverSocketId(friendId);
    if (receiverSocketId) {
      const getDetail = await User.findById(friendId);
      io.to(receiverSocketId).emit(
        "blockMessage",
        `${
          getDetail?.name.firstName +
          " " +
          getDetail?.name.middleName +
          " " +
          getDetail?.name.lastName
        } blocked You`
      );
    }

    return res.status(200).json({ message: "Friendship blocked.", friendship });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error blocking friendship.", error });
  }
};

export const getFriendship: Route = async (req, res) => {
  try {
    const getUsers = await Friends.find({
      $or: [{ userId: req.user._id }, { friendId: req.user._id }],
    })
      .populate("friendId")
      .exec();

    res.status(200).json(getUsers);
  } catch (error) {
    console.error("Error in getFriendShip: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSearch: Route = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required." });
  }

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { userName: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    return res.status(500).json({ message: "Error searching users.", error });
  }
};
