// Jobvia / Server / routes / interviewRouters.js
import express from "express";
import {
  addInterviewRole,
  deleteInterviewRole,
  getInterviewCompanies,
  getInterviewQuestionsByCompany,
  getInterviewRoles,
  getQuestionsByRole,
  updateInterviewRole,
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

interviewRouter.put(
  "/role/:roleId",
  authMiddleware,
  authorize("admin"),
  upload.fields([
    { name: "imageFile", maxCount: 1 },
    { name: "csvFile", maxCount: 1 },
  ]),
  updateInterviewRole,
);

interviewRouter.delete(
  "/role/:roleId",
  authMiddleware,
  authorize("admin"),
  deleteInterviewRole,
);

interviewRouter.get("/companies", getInterviewCompanies);

interviewRouter.get("/company/:companyId", getInterviewQuestionsByCompany);

export default interviewRouter;
