// Jobvia / Server / routes / userRouters.js
import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userControllers.js";
import { upload } from "../middleware/uploadMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getProfile);
userRouter.put(
  "/",
  authMiddleware,
  authorize("user"),
  upload.single("resume"),
  updateProfile,
);

export default userRouter;
