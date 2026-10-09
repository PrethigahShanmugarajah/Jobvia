// Jobvia / Server / routes / inquiryRouters.js
import express from "express";
import { submitInquiry } from "../controllers/inquiryControllers.js";

const inquiryRouter = express.Router();

inquiryRouter.post("/", submitInquiry);

export default inquiryRouter;
