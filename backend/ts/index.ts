import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { peer } from "./lib/peer.js";
import { app, server } from "./lib/socket.js";
import { errorHandler } from "./middleware/error.js";
import { notFound } from "./middleware/notfound.js";
import { PORT } from "./lib/env.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));

// Create a Peer Server
peer.on("connection", (client) => {
  console.log("Peer connected:", client);
});

peer.on("disconnected", (client) => {
  console.log("Peer disconnected:", client);
});

app.use(notFound)
app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})