import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import {
  getProfile,
  getResume,
  updateProfile,
} from "../controllers/userControllers.js";
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
userRouter.get("/resume/:id", getResume);

export default userRouter;
