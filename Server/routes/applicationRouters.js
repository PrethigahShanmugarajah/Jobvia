// Jobvia / Server / routes / applicationRouters.js
import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import {
  applyJob,
  getApplications,
  getUserApplications,
} from "../controllers/applicationControllers.js";

const applicationRouter = express.Router();

applicationRouter.post("/apply/:id", authMiddleware, applyJob);
applicationRouter.get("/user", authMiddleware, getUserApplications);
applicationRouter.get(
  "/:id/applications",
  authMiddleware,
  authorize("admin"),
  getApplications,
);

export default applicationRouter;
