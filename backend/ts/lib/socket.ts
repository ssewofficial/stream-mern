import { Server } from "socket.io";
import httpServer from "node:http";
import express from "express";
import { JoinRoomPayload } from "../types.js";

const app = express();
const server = httpServer.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allow specific methods
    allowedHeaders: ["Content-Type"], // Allow specific headers
    credentials: true, // Allow credentials
  },
});

const userSocketMap: { [userId: string]: string } = {};

export function getRecieverSocketId(userId: string) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
