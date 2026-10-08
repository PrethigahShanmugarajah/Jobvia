// Jobvia / Server / controllers / applicationControllers.js
import Job from "../models/Job.js";
import User from "../models/User.js";
import Application from "../models/Application.js";

/* -------- Apply Job -------- */
export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required.",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.phone) {
      return res.status(400).json({
        success: false,
        message:
          "Please add your phone number to your profile before applying for this job.",
      });
    }

    if (!user.resume) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload your resume to your profile before applying for this job.",
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      user: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    const newApplication = new Application({
      job: jobId,
      user: userId,
    });

    await newApplication.save();

    return res.status(201).json({
      success: true,
      message: "Job application submitted successfully.",
    });
  } catch (error) {
    console.error("Apply Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while applying for the job.",
      error: `Apply Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};
