// Jobvia / Server / controllers / interviewControllers.js
import InterviewRole from "../models/InterviewRole.js";

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
