// Jobvia / Server / middleware  / authMiddleware.js
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/env.js";

/* -------- Authenticate User -------- */
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required.",
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(
      "Authenticate User Error:",
      error?.stack || error?.message || error,
    );

    return res.status(401).json({
      success: false,
      message: "An unexpected error occurred while authenticating the user.",
      error: `Authenticate User Error: ${error?.stack || error?.message || error}`,
    });
  }
};
