// Jobvia / Server / controllers / interviewControllers.js
import InterviewRole from "../models/InterviewRole.js";
import mongoose from "mongoose";
import RoleQuestion from "../models/RoleQuestion.js";
import { parseQuestions, uploadFiles } from "../utils/helpers.js";

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

/* -------- Add Interview Role -------- */
export const addInterviewRole = async (req, res) => {
  try {
    const { roleName, questionsCount, questionsData } = req.body;

    const normalizedRoleName =
      typeof roleName === "string" ? roleName.trim() : roleName;

    if (typeof roleName !== "string") {
      return res.status(400).json({
        success: false,
        message: "Role name must be a valid string.",
      });
    }

    if (!roleName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Role name is required.",
      });
    }

    if (questionsCount == null) {
      return res.status(400).json({
        success: false,
        message: "Questions count is required.",
      });
    }

    if (!Number.isInteger(Number(questionsCount))) {
      return res.status(400).json({
        success: false,
        message: "Questions count must be a valid integer.",
      });
    }

    if (Number(questionsCount) < 0) {
      return res.status(400).json({
        success: false,
        message: "Questions count cannot be negative.",
      });
    }

    const exists = await InterviewRole.findOne({
      roleName: normalizedRoleName,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "An interview role with this name already exists.",
      });
    }

    const uploads = await uploadFiles(req.files, {
      imageFile: { folder: "jobvia/roles", type: "image" },
      csvFile: { folder: "jobvia/csv", type: "raw" },
    });

    const role = await InterviewRole.create({
      roleName: normalizedRoleName,
      image: uploads.imageFile || "",
      questionsCount: Number(questionsCount),
      csvFileUrl: uploads.csvFile || "",
      createdBy: req.user.id,
    });

    if (questionsData) {
      const formatted = parseQuestions(
        questionsData,
        "role",
        role._id,
        req.user.id,
      );

      await RoleQuestion.insertMany(formatted);
    }

    return res.status(201).json({
      success: true,
      message: "Interview role created successfully.",
      role,
    });
  } catch (error) {
    console.error(
      "Add Interview Role Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while creating the interview role.",
      error: `Add Interview Role Error: ${error?.stack || error?.message || error}`,
    });
  }
};
