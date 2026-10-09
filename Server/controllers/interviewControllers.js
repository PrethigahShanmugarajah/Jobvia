// Jobvia / Server / controllers / interviewControllers.js
import InterviewRole from "../models/InterviewRole.js";
import mongoose from "mongoose";
import RoleQuestion from "../models/RoleQuestion.js";

/* -------- Get Interview Roles -------- */
export const getInterviewRoles = async (req, res) => {
  try {
    const roles = await InterviewRole.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        roles.length === 0
          ? "No interview roles found."
          : roles.length === 1
            ? "Interview role retrieved successfully."
            : "Interview roles retrieved successfully.",
      count: roles.length,
      roles,
    });
  } catch (error) {
    console.error(
      "Get Interview Roles Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving interview roles.",
      error: `Get Interview Roles Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Questions By Role -------- */
export const getQuestionsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview role ID.",
      });
    }

    const [role, questions] = await Promise.all([
      InterviewRole.findById(roleId),
      RoleQuestion.find({ roleId }).sort({ createdAt: -1 }),
    ]);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Interview role not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        questions.length === 0
          ? "No questions found for this interview role."
          : questions.length === 1
            ? "Question retrieved successfully."
            : "Questions retrieved successfully.",
      role,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error(
      "Get Questions By Role Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving questions for this interview role.",
      error: `Get Questions By Role Error: ${error?.stack || error?.message || error}`,
    });
  }
};
