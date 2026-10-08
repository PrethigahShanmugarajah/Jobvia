// Jobvia / Server / controllers / authControllers.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateOTP, getOTPExpiration } from "../utils/otp.js";
import { jwtSecret, jwtSecretExpiresIn, otpTtlMinutes } from "../config/env.js";
import { sendForgotPasswordEmail, sendVerification } from "../utils/emailService.js";
import jwt from "jsonwebtoken";

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
    const verificationOTPExpires = getOTPExpiration(otpTtlMinutes);

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

/* -------- Verify Email -------- */
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const user = await User.findOne({
      email,
      verificationOTP: otp,
      verificationOTPExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "The verification code is invalid or has expired.",
      });
    }

    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully! You can now log in.",
    });
  } catch (error) {
    console.error(
      "Verify Email Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while verifying the email.",
      error: `Verify Email Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Login -------- */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email address before logging in.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
      expiresIn: jwtSecretExpiresIn,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while logging in.",
      error: `Login Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Forgot Password-------- */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No account was found with this email address.",
      });
    }

    const resetOTP = generateOTP();
    const resetOTPExpires = getOTPExpiration(otpTtlMinutes);

    user.resetPasswordOTP = resetOTP;
    user.resetPasswordOTPExpires = resetOTPExpires;

    await user.save();

    /* -------- Send the Verification Email -------- */
    try {
      await sendForgotPasswordEmail(email, user.name, resetOTP);
    } catch (error) {
      console.error("Failed to send reset email:", error);
    }

    return res.status(200).json({
      success: true,
      message: "A password reset code has been sent to your email.",
    });
  } catch (error) {
    console.error(
      "Forgot Password Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while processing the password reset request.",
      error: `Forgot Password Error: ${error?.stack || error?.message || error}`,
    });
  }
};
