// Jobvia / Server / routes / applicationRouters.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  applyJob,
  getUserApplications,
} from "../controllers/applicationControllers.js";

const applicationRouter = express.Router();

applicationRouter.post("/apply/:id", authMiddleware, applyJob);
applicationRouter.get("/user", authMiddleware, getUserApplications);

export default applicationRouter;
