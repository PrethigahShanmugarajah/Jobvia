// Jobvia / Server / routes / interviewRouters.js
import express from "express";
import { getInterviewRoles } from "../controllers/interviewControllers.js";

const interviewRouter = express.Router();

interviewRouter.get("/roles", getInterviewRoles);

export default interviewRouter;
