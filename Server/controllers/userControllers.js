// Jobvia / Server / controllers / userControllers.js
import User from "../models/User.js";

/* -------- Get Profile -------- */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully.",
      user,
    });
  } catch (error) {
    console.error(
      "Get Profile Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving the profile.",
      error: `Get Profile Error: ${error?.stack || error?.message || error}`,
    });
  }
};
