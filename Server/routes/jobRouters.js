// Jobvia / Server / routes / jobRouters.js
import express from "express";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { createJob, getDashboardStats } from "../controllers/jobControllers.js";

const jobRouter = express.Router();

jobRouter.post(
  "/",
  authMiddleware,
  authorize("admin"),
  upload.single("companyLogo"),
  createJob,
);

jobRouter.get(
  "/admin/stats",
  authMiddleware,
  authorize("admin"),
  getDashboardStats,
);

export default jobRouter;
