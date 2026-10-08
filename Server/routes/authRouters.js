// Jobvia / Server / routes / authRouters.js
import express from "express";
import {
  login,
  register,
  verifyEmail,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/login", login);

export default authRouter;
