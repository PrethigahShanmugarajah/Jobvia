// Jobvia / Server / controllers / savedControllers.js
import User from "../models/User.js";

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
