// Jobvia / Server / utils / emailService.js
import "dotenv/config";
import { brevoApiKey, otpTtlMinutes, senderEmail } from "../config/env.js";

/* -------- Email Sender Function -------- */
const sendEmail = async ({ to, subject, htmlContent }) => {
  try {
    if (!brevoApiKey || !senderEmail) {
      throw new Error(
        "Email configuration is missing (Brevo API key or sender email).",
      );
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        sender: { name: "Jobvia", email: senderEmail },
        to,
        subject,
        htmlContent,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Brevo API Error");
    }

    return result;
  } catch (error) {
    console.error(`Email Error [${subject}]:`, error.message);

    throw error;
  }
};

/* -------- OTP Email Template -------- */
const otpTemplate = (title, name, otp, message) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; text-align: center;">
        <h2 style="color: #C026D3;">${title}</h2>
        <p>Hi ${name},</p>
        <p>${message}</p>

        <div style="margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #C026D3; letter-spacing: 5px; background: #f3f4f6; padding: 10px 20px; border-radius: 8px;">${otp}</span>
        </div>
        
        <p>This code will expire in ${otpTtlMinutes} minutes.</p>

        <p>If you did not request this, please ignore this email.</p>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
        
        <p style="font-size: 12px; color: #888888;">&copy; 2026 Jobvia. All rights reserved.</p>
    </div>
`;

/* -------- Send Verification Email -------- */
export const sendVerification = async (email, name, otp) => {
  return sendEmail({
    to: [{ email, name }],
    subject: "Your Verification Code - Jobvia",
    htmlContent: otpTemplate(
      "Verify your email",
      name,
      otp,
      "Thank you for signing up. Please use the following 6-digit code to verify your email address.",
    ),
  });
};
