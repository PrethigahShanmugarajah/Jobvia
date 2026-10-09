// Jobvia / Server / controllers / savedControllers.js
import User from "../models/User.js";
import mongoose from "mongoose";

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
      error: `Get Saved Items Error: ${error?.stack || error?.message || error}`,
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
      error: `Toggle Save Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};
