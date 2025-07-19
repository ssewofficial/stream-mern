import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { Route } from "../types.js";
import { JWT_SECRET } from "./env.js";

export const protectRoute: Route = async (req, res, next) => {
  try {
    req.user = undefined;
    const token = req.cookies["sse-auth.js.session-token"];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
    };

    if (!decoded && typeof decoded !== "object") {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User Not Found" });
    }

    req.user = user;

    if (typeof next === "function") {
      next();
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in protectRoute middleware:", error.message);
    } else {
      console.log("Error in protectRoute middleware:", error);
    }
    res.status(500).json({ message: "Internal server error" });
  }
};
