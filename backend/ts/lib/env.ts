import { config } from "@dotenvx/dotenvx";

config();

export const JWT_SECRET = process.env.JWT_SECRET || "SSE_Secret";
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/sse-stream";
export const PORT = process.env.PORT || 5173;
export const NODE_ENV = process.env.NODE_ENV || "development";
