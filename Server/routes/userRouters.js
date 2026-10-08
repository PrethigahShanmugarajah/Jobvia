// Jobvia / Server / routes / userRouters.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProfile } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getProfile);

export default userRouter;
