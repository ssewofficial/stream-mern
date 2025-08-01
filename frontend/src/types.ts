import type { Socket } from "socket.io-client";

type TimeStamp = {
  createdAt: string;
  updatedAt: string;
};

type User = TimeStamp & {
  _id: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  userName: string;
  personalId: string;
  email: string;
  profilePic: string;
};

type Friend = TimeStamp & {
  userId: string;
  friendId: User | string;
  status: "pending" | "accepted" | "blocked";
};

export type LoginData = {
  identifier: string;
  password: string;
};

export type SignUpData = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
};

export type AuthState = {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: any[];
  socket: Socket | null;
  checkAuth: () => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

export type FriendState = {
  friends: Friend[];
  searchResults: User[];
  isLoading: boolean;
  isSendingRequest: boolean;
  isAcceptingRequest: boolean;
  isRejectingRequest: boolean;
  isBlockingFriend: boolean;
  isSearching: boolean;

  fetchFriends: () => Promise<void>;
  searchFriends: (query: string) => Promise<void>;
  sendFriendRequest: (friendId: string) => Promise<void>;
  acceptFriendRequest: (friendId: string) => Promise<void>;
  rejectFriendRequest: (friendId: string) => Promise<void>;
  blockFriend: (friendId: string) => Promise<void>;
};

export type ThemeState = {
  theme: string;
  setTheme: (theme: Theme) => void;
};

export type Theme =
  | "light"
  | "dark"
  | "cupcake"
  | "bumblebee"
  | "emerald"
  | "corporate"
  | "synthwave"
  | "retro"
  | "cyberpunk"
  | "valentine"
  | "halloween"
  | "garden"
  | "forest"
  | "aqua"
  | "lofi"
  | "pastel"
  | "fantasy"
  | "wireframe"
  | "black"
  | "luxury"
  | "dracula"
  | "cmyk"
  | "autumn"
  | "business"
  | "acid"
  | "lemonade"
  | "night"
  | "coffee"
  | "winter"
  | "dim"
  | "nord"
  | "sunset";
