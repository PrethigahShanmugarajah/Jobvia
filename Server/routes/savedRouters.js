import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getSavedItems,
  toggleSaveJob,
  toggleSaveQuestion,
} from "../controllers/savedControllers.js";

const savedRouter = express.Router();

savedRouter.get("/", authMiddleware, getSavedItems);
savedRouter.post("/job/:jobId", authMiddleware, toggleSaveJob);
savedRouter.post("/question/:questionId", authMiddleware, toggleSaveQuestion);

export default savedRouter;
