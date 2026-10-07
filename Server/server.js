// Jobvia / Server / server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { port } from "./config/env.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRouters.js";

/* -------- INITIALIZE EXPRESS -------- */
const app = express();

/* -------- CONNECT TO DATABASE -------- */
connectDB();

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(cors());
app.use(express.json());

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working!"));
app.use("/api/auth", authRouter);

/* -------- PORT -------- */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
