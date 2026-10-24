import User from "../models/User.js";
import mongoose from "mongoose";
import RoleQuestion from "../models/RoleQuestion.js";
import InterviewQuestion from "../models/InterviewQuestion.js";

/* -------- Get Saved Items -------- */
export const getSavedItems = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("savedJobs")
      .populate({
        path: "savedInterviewQuestion",
        populate: { path: "company" },
      })
      .populate({ path: "savedRoleQuestions", populate: { path: "roleId" } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        user.savedJobs.length === 0 &&
        user.savedInterviewQuestion.length === 0 &&
        user.savedRoleQuestions.length === 0
          ? "No saved items found."
          : "Saved items retrieved successfully.",
      savedJobs: user.savedJobs,
      savedInterviewQuestions: user.savedInterviewQuestion,
      savedRoleQuestions: user.savedRoleQuestions,
    });
  } catch (error) {
    console.error(
      "Get Saved Items Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving saved items.",
    });
  }
};

/* -------- Toggle Save Job -------- */
export const toggleSaveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID.",
      });
    }

    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isSaved = user.savedJobs.some((id) => id.toString() === jobId);

    if (isSaved) {
      user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId);
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: isSaved
        ? "Job removed from saved items successfully."
        : "Job saved successfully.",
      count: user.savedJobs.length,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    console.error(
      "Toggle Save Job Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating saved jobs.",
    });
  }
};

/* -------- Toggle Save Question -------- */
export const toggleSaveQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID.",
      });
    }

    const { type } = req.query;

    if (type !== "role" && type !== "interview") {
      return res.status(400).json({
        success: false,
        message: "Invalid question type. Use 'role' or 'interview'.",
      });
    }

    const userId = req.user.id;

    const question =
      type === "role"
        ? await RoleQuestion.findById(questionId)
        : await InterviewQuestion.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: `Question not found in the ${type} questions collection.`,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let isSaved;
    let message;

    if (type === "role") {
      // isSaved = user.savedRoleQuestions.includes(questionId);
      isSaved = user.savedRoleQuestions.some(
        (id) => id.toString() === questionId,
      );

      if (isSaved) {
        user.savedRoleQuestions = user.savedRoleQuestions.filter(
          (id) => id.toString() !== questionId,
        );
        message = "Question removed from saved items successfully.";
      } else {
        user.savedRoleQuestions.push(questionId);
        message = "Question saved successfully.";
      }
    } else {
      // isSaved = user.savedInterviewQuestion.includes(questionId);
      isSaved = user.savedInterviewQuestion.some(
        (id) => id.toString() === questionId,
      );

      if (isSaved) {
        user.savedInterviewQuestion = user.savedInterviewQuestion.filter(
          (id) => id.toString() !== questionId,
        );
        message = "Question removed from saved items successfully.";
      } else {
        user.savedInterviewQuestion.push(questionId);
        message = "Question saved successfully.";
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message,
      savedInterviewQuestions: user.savedInterviewQuestion,
      savedRoleQuestions: user.savedRoleQuestions,
    });
  } catch (error) {
    console.error(
      "Toggle Save Question Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating saved questions.",
    });
  }
};
