// Jobvia / Server / routes / applicationRouters.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { applyJob } from "../controllers/applicationControllers.js";

const applicationRouter = express.Router();

applicationRouter.post("/apply/:id", authMiddleware, applyJob);

export default applicationRouter;
