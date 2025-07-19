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

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join-room", ({ roomId, users }: JoinRoomPayload) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);

    // Notify other users in the room
    socket.to(roomId).emit("user-joined", { userId: socket.id, users });

    socket.on("ping", (timestamp) => {
      const latency = Date.now() - timestamp;
      socket.emit("latency", { latency, timestamp });
    });

    socket.on("send-message", ({ roomId, message }) => {
      io.to(roomId).emit("message", message);
    });

    socket.on("leave-room", (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room: ${roomId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      socket.to(roomId).emit("user-disconnected", socket.id);
    });
  });
});

export { io, server, app };
