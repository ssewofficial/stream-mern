import { Router } from "express";
import * as friend from "../controllers/friends.js";
import { protectRoute } from "../middleware/auth.js";

const router = Router();

router.post("/create", protectRoute, friend.createFriendship);
router.put("/accept", protectRoute, friend.acceptFriendship);
router.put("/block", protectRoute, friend.blockFriendship);
router.delete("/reject", protectRoute, friend.rejectFriendship);
router.get("/", protectRoute, friend.getFriendship);

export default router;
