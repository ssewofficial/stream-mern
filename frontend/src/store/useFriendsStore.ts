import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import type { FriendState } from "../types";

export const useFriendStore = create<FriendState>((set, get) => ({
  friends: [],
  searchResults: [],
  isLoading: false,
  isSendingRequest: false,
  isAcceptingRequest: false,
  isRejectingRequest: false,
  isBlockingFriend: false,
  isSearching: false,

  fetchFriends: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/friends");
      set({ friends: response.data });
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        toast.error((error as any).response.data.message);
      } else {
        toast.error("An error occurred");
      }
    } finally {
      set({ isLoading: false });
    }
  },

  searchFriends: async (query) => {
    set({ isSearching: true });
    try {
      const res = await axiosInstance.get(`/friends/search?query=${query}`);
      set({ searchResults: res.data });
    } catch (error) {
      console.error("Error searching users:", error);
      toast.error("Failed to search users.");
    } finally {
      set({ isSearching: false });
    }
  },

  sendFriendRequest: async (friendId) => {
    set({ isSendingRequest: true });
    try {
      await axiosInstance.post("/friends/create", { friendId });
      toast.success("Friend request sent.");
      get().fetchFriends();
    } catch (error) {
      console.error("Error sending friend request:", error);
      toast.error("Failed to send friend request.");
    } finally {
      set({ isSendingRequest: false });
    }
  },

  acceptFriendRequest: async (friendId) => {
    set({ isAcceptingRequest: true });
    try {
      await axiosInstance.put("/friends/accept", { friendId });
    } catch (error) {
      console.error("Error accepting friend request:", error);
      toast.error("Failed to accept friend request.");
    } finally {
      set({ isAcceptingRequest: false });
    }
  },

  rejectFriendRequest: async (friendId) => {
    set({ isRejectingRequest: true });
    try {
      await axiosInstance.delete("/friends/reject", { data: { friendId } });
      toast.success("Friend request rejected.");
      get().fetchFriends();
    } catch (error) {
      console.error("Error rejecting friend request:", error);
      toast.error("Failed to reject friend request.");
    } finally {
      set({ isRejectingRequest: false });
    }
  },

  blockFriend: async (friendId) => {
    set({ isBlockingFriend: true });
    try {
      await axiosInstance.put("/friends/block", { friendId });
      toast.success("Friend blocked.");
      get().fetchFriends();
    } catch (error) {
      console.error("Error blocking friend:", error);
      toast.error("Failed to block friend.");
    } finally {
      set({ isBlockingFriend: false });
    }
  },
}));
