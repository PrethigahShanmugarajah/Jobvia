// Jobvia / Server / routes / interviewRouters.js
import express from "express";
import {
  getInterviewRoles,
  getQuestionsByRole,
} from "../controllers/interviewControllers.js";

const interviewRouter = express.Router();

interviewRouter.get("/roles", getInterviewRoles);

interviewRouter.get("/role/:roleId", getQuestionsByRole);

export default interviewRouter;
