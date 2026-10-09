// Jobvia / Server / routes / savedRouters.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getSavedItems,
  toggleSaveJob,
} from "../controllers/savedControllers.js";

const savedRouter = express.Router();

savedRouter.get("/", authMiddleware, getSavedItems);
savedRouter.post("/job/:jobId", authMiddleware, toggleSaveJob);

export default savedRouter;
