// Jobvia / Server / controllers / userControllers.js
import User from "../models/User.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

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

/* -------- Update Profile -------- */
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updateDate = {};

    if (name) {
      updateDate.name = name;
    }

    if (email) {
      updateDate.email = email;
    }

    if (phone) {
      updateDate.phone = phone;
    }

    if (req.file && req.user.role === "user") {
      // const originalName = req.file.originalName;
      const originalName = req.file.originalname;
      const extension = originalName.split(".").pop().toLowerCase();

      /* -------- Sanitized filename but keep the extension for raw files -------- */
      const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
      const sanitizedBase = nameWithoutExt
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9\-_]/g, "");
      const sanitizedFileName = `${sanitizedBase}.${extension}`;

      /* -------- Determine resource type: images should be 'image', docs/pdfs often safer as 'raw' for delivery -------- */
      const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(extension);
      const resourceType = isImage ? "image" : "raw";

      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        "jobvia/resumes",
        resourceType,
        sanitizedFileName,
      );

      if (uploadResult) {
        updateDate.resume = uploadResult.secure_url;
        updateDate.resumePublicId = uploadResult.public_id;
      }
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateDate, {
      returnDocument: "after",
    }).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating the profile.",
      error: `Update Profile Error: ${error?.stack || error?.message || error}`,
    });
  }
};
