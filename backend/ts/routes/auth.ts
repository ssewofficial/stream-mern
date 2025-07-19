import { Router } from "express";
import * as user from "../controllers/auth.js"
import { protectRoute } from "../middleware/auth.js";
import upload from "../lib/upload.js";

const router = Router();

router.post("/signup", user.signup);
router.post("/login", user.login);
router.post("/logout", user.logout);
router.get("/check", protectRoute, user.checkAuth);

router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  user.updateProfile
);

export default router;
