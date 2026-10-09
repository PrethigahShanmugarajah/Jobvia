// Jobvia / Server / routes / savedRouters.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getSavedItems } from "../controllers/savedControllers.js";

const savedRouter = express.Router();

savedRouter.get("/", authMiddleware, getSavedItems);

export default savedRouter;
