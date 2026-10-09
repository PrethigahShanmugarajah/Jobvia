// Jobvia / Server / server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { port } from "./config/env.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouters.js";
import userRouter from "./routes/userRouters.js";
import companyRouter from "./routes/companyRouters.js";
import jobRouter from "./routes/jobRouters.js";
import applicationRouter from "./routes/applicationRouters.js";
import interviewRouter from "./routes/interviewRouters.js";
import savedRouter from "./routes/savedRouters.js";

/* -------- INITIALIZE EXPRESS -------- */
const app = express();

/* -------- CONNECT TO DATABASE -------- */
connectDB();

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working!"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/saved", savedRouter);

/* -------- PORT -------- */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
