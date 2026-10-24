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
    });
  }
};

/* -------- Get User Applications -------- */
export const getUserApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ user: userId })
      .populate("job")
      .sort({ createdAt: -1 });

    const validApplications = applications.filter((app) => app.job !== null);

    return res.status(200).json({
      success: true,
      message:
        validApplications.length === 0
          ? "No applications found."
          : validApplications.length === 1
            ? "Application retrieved successfully."
            : "Applications retrieved successfully.",
      count: validApplications.length,
      applications: validApplications,
    });
  } catch (error) {
    console.error(
      "Get User Applications Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving your applications.",
    });
  }
};

/* -------- Get Applications -------- */
export const getApplications = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate({ path: "user", select: "name email phone role resume" })
      .sort({ createdAt: -1 });

    const validApplications = applications.filter((app) => app.user);

    return res.status(200).json({
      success: true,
      message:
        applications.filter((app) => app.user).length === 0
          ? "No applications found for this job."
          : applications.filter((app) => app.user).length === 1
            ? "Application retrieved successfully."
            : "Applications retrieved successfully.",
      count: validApplications.length,
      jobName: job.roleName,
      applications: applications
        .filter((app) => app.user)
        .map((app) => ({
          applicationId: app._id,
          ...app.user._doc,
          appliedDate: app.createdAt,
          resume: app.user.resume || "",
        })),
    });
  } catch (error) {
    console.error(
      "Get Applications Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving applications.",
    });
  }
};
