// Jobvia / Server / routes / interviewRouters.js
import express from "express";
import {
  addInterviewRole,
  getInterviewRoles,
  getQuestionsByRole,
} from "../controllers/interviewControllers.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const interviewRouter = express.Router();

interviewRouter.get("/roles", getInterviewRoles);

interviewRouter.get("/role/:roleId", getQuestionsByRole);

interviewRouter.post(
  "/role",
  authMiddleware,
  authorize("admin"),
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "csvFile", maxCount: 1 },
  ]),
  addInterviewRole,
);

export default interviewRouter;
