// Jobvia / Server / routes / companyRouters.js
import express from "express";
import { getCompanies } from "../controllers/companyControllers.js";

const companyRouter = express.Router();

companyRouter.get("/", getCompanies);

export default companyRouter;
