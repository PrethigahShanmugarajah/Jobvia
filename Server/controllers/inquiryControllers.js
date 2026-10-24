// Jobvia / Server / controllers / inquiryControllers.js
import Inquiry from "../models/Inquiry.js";
import { sendAdminInquiryEmail } from "../utils/emailService.js";

/* -------- Submit Inquiry -------- */
export const submitInquiry = async (req, res) => {
  try {
    const { fullName, email, phone, subject, message } = req.body;

    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required.",
      });
    }

    if (!subject) {
      return res.status(400).json({
        success: false,
        message: "Subject is required.",
      });
    }

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const inquiry = await Inquiry.create({
      fullName,
      email,
      phone,
      subject,
      message,
    });

    try {
      await sendAdminInquiryEmail({ fullName, email, phone, subject, message });
    } catch (emailError) {
      console.error("Failed To Notify The Admin Via Email:", emailError);
    }

    return res.status(201).json({
      success: true,
      message:
        "Your inquiry has been submitted successfully. We'll get back to you shortly.",
      inquiry,
    });
  } catch (error) {
    console.error(
      "Submit Inquiry Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while submitting your inquiry.",
      error: `Submit Inquiry Error: ${error?.stack || error?.message || error}`,
    });
  }
};
