import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import { peer } from "./lib/peer.js";
import { app, server } from "./lib/socket.js";
import { errorHandler } from "./middleware/error.js";
import { notFound } from "./middleware/notfound.js";
import { CLIENT_URL, PORT } from "./lib/env.js";

// Routes
import authRoutes from "./routes/auth.js";
import { connectDB } from "./lib/db.js";

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "sse-auth.js.session-token",
    ],
    exposedHeaders: ["sse-auth.js.session-token"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Create a Peer Server
peer.on("connection", (client) => {
  console.log("Peer connected:", client);
});

peer.on("disconnected", (client) => {
  console.log("Peer disconnected:", client);
});

// Allow requests from specific origins
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
