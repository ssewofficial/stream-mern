import { generateToken } from "../lib/jwt.js";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import { Route } from "../types.js";
import { getName } from "../lib/name.js";

export const signup: Route = async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const name = getName(fullName);

    const newUser = new User({
      name: {
        firstName: name.firstName,
        middleName: name.middleName,
        lastName: name.lastName,
      },
      userName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: {
          firstName: newUser.name.firstName,
          middleName: newUser.name.middleName,
          lastName: newUser.name.lastName,
        },
        userName: newUser.userName,
        personalId: newUser.personalId,
        email: newUser.email,
        profilePic: newUser.profilePic || null,
        token: generateToken(newUser._id, res),
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login: Route = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { userName: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: {
        firstName: user.name.firstName,
        middleName: user.name.middleName,
        lastName: user.name.lastName,
      },
      userName: user.userName,
      personalId: user.personalId,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id, res),
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout: Route = (req, res) => {
  try {
    res.cookie("sse-auth.js.session-token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile: Route = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!req.file) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const filePath = `/uploads/${req.file?.filename}`;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: filePath },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth: Route = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
