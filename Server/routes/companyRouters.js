// Jobvia / Server / routes / companyRouters.js
import express from "express";
import { addCompany, getCompanies } from "../controllers/companyControllers.js";
import { authMiddleware, authorize } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const companyRouter = express.Router();

companyRouter.get("/", getCompanies);
companyRouter.post(
  "/",
  authMiddleware,
  authorize("admin"),
  upload.single("logo"),
  addCompany,
);

export default companyRouter;
