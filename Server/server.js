// Jobvia / Server / server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import { port } from "./config/env.js";

/* -------- INITIALIZE EXPRESS -------- */
const app = express();

/* -------- CONNECT TO DATABASE -------- */

/* -------- MIDDLEWARE CONFIGURATION -------- */
app.use(cors());
app.use(express.json());

/* -------- ROUTES -------- */
app.get("/", (req, res) => res.send("API is Working!"));

/* -------- PORT -------- */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
