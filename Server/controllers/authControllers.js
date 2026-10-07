// Jobvia / Server / controllers / authControllers.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateOTP, getOTPExpiration } from "../utils/otp.js";
import { sendVerification } from "../utils/emailService.js";

/* -------- Register -------- */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "An account with this email address already exists.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    if (password.length > 12) {
      return res.status(400).json({
        success: false,
        message: "Password must not exceed 12 characters.",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one uppercase letter (A-Z).",
      });
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one lowercase letter (a-z).",
      });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one number (0-9).",
      });
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least one special character.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRole = role || "user";

    const verificationOTP = generateOTP();

    const verificationOTPExpires = getOTPExpiration(10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
      verificationOTP,
      verificationOTPExpires,
    });

    /* -------- Send the Verification Email -------- */
    try {
      await sendVerification(email, name, verificationOTP);
    } catch (error) {
      console.error("Failed to send verification email:", error);
    }

    return res.status(201).json({
      success: true,
      message:
        "Account created successfully! Please check your email for the 6-digit verification code.",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: false,
      },
    });
  } catch (error) {
    console.error("Register Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while registering the user.",
      error: `Register Error: ${error?.stack || error?.message || error}`,
    });
  }
};
