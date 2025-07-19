import { Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./env.js";
import mongoose from "mongoose";

// const privateKey = fs.readFileSync(path.join(__dirname, 'path/to/your/private.key'), 'utf8');

export const generateToken = (
  userId: string | mongoose.Types.ObjectId,
  res: Response
): string => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "30d",
    issuer: "SSE World",
  });

  //   const token = jwt.sign({ userId }, privateKey, {
  //     algorithm: 'RS256', // Use RS256 algorithm
  //     expiresIn: '30d',
  //     issuer: 'SSE World'
  //   });

  res.cookie("sse-auth.js.session-token", token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "development",
    sameSite: "lax",
  });

  return token;
};
