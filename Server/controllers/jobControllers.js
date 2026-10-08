// Jobvia / Server / controllers / jobControllers.js
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

/* -------- Create Job -------- */
export const createJob = async (req, res) => {
  try {
    let {
      roleName,
      companyName,
      techStack,
      location,
      experience,
      salary,
      salaryType,
      jobType,
      postDate,
      category,
      openings,
      overview,
      responsibilities,
      jobCriteria,
      education,
    } = req.body;

    if (!roleName) {
      return res.status(400).json({
        success: false,
        message: "Job role name is required.",
      });
    }

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Job location is required.",
      });
    }

    if (!experience) {
      return res.status(400).json({
        success: false,
        message: "Job experience is required.",
      });
    }

    if (!salary) {
      return res.status(400).json({
        success: false,
        message: "Salary is required.",
      });
    }

    if (!jobType) {
      return res.status(400).json({
        success: false,
        message: "Job type is required.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Job category is required.",
      });
    }

    if (!openings) {
      return res.status(400).json({
        success: false,
        message: "Number of job openings is required.",
      });
    }

    if (!overview) {
      return res.status(400).json({
        success: false,
        message: "Job overview is required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Company logo is required.",
      });
    }

    if (typeof techStack === "string") {
      techStack = JSON.parse(techStack);
    }

    if (typeof responsibilities === "string") {
      responsibilities = JSON.parse(responsibilities);
    }

    if (typeof jobCriteria === "string") {
      jobCriteria = JSON.parse(jobCriteria);
    }

    if (typeof education === "string") {
      education = JSON.parse(education);
    }

    if (!techStack) {
      return res.status(400).json({
        success: false,
        message: "Technology stack is required.",
      });
    }

    if (techStack.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one technology is required.",
      });
    }

    if (!responsibilities) {
      return res.status(400).json({
        success: false,
        message: "Job responsibilities are required.",
      });
    }

    if (responsibilities.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one job responsibility is required.",
      });
    }

    if (!jobCriteria) {
      return res.status(400).json({
        success: false,
        message: "Job criteria are required.",
      });
    }

    if (jobCriteria.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one job criterion is required.",
      });
    }

    if (!education) {
      return res.status(400).json({
        success: false,
        message: "Education requirements are required.",
      });
    }

    if (education.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one education requirement is required.",
      });
    }

    let postDateValue;

    if (postDate) {
      if (
        typeof postDate === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(postDate)
      ) {
        const [year, month, day] = postDate.split("-");
        postDateValue = new Date(
          Date.UTC(Number(year), Number(month) - 1, Number(day)),
        );
      } else {
        postDateValue = new Date(postDate);
      }

      if (isNaN(postDateValue.getTime())) {
        postDateValue = new Date();
      }
    } else {
      postDateValue = new Date();
    }

    let companyLogo = "";

    const uploadRes = await uploadToCloudinary(
      req.file.buffer,
      "jobvia/logos",
      "image",
      req.file.originalname,
    );

    companyLogo = uploadRes.secure_url;

    const job = new Job({
      companyLogo,
      roleName,
      companyName,
      techStack,
      location,
      experience,
      salary,
      salaryType,
      jobType,
      postDate: postDateValue,
      category,
      openings,
      overview,
      responsibilities,
      jobCriteria,
      education,
      createdBy: req.user.id,
    });

    await job.save();

    return res.status(201).json({
      success: true,
      message: "Job created successfully.",
      job,
    });
  } catch (error) {
    console.error("Create Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the job.",
      error: `Create Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Dashboard Stats -------- */
export const getDashboardStats = async (req, res) => {
  try {
    const adminId = req.user.id;
    const totalJobs = await Job.countDocuments();
    const closedJobs = await Job.countDocuments({ status: "closed" });
    const totalApplicationsResult = await Application.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userRecord",
        },
      },

      { $unwind: "$userRecord" },

      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "jobRecord",
        },
      },

      { $unwind: "$jobRecord" },

      { $count: "count" },
    ]);

    const totalApplications = totalApplicationsResult[0]?.count || 0;
    const companies = await Job.distinct("companyName", { status: "active" });
    const totalCompanies = companies.length;

    return res.status(200).json({
      success: true,
      message: "Dashboard statistics retrieved successfully.",
      stats: {
        totalJobs: totalJobs.toLocaleString(),
        closedJobs: closedJobs.toLocaleString(),
        totalApplicants: totalApplications.toLocaleString(),
        totalCompanies: totalCompanies.toLocaleString(),
      },
    });
  } catch (error) {
    console.error(
      "Get Dashboard Stats Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving dashboard statistics.",
      error: `Get Dashboard Stats Error: ${error?.stack || error?.message || error}`,
    });
  }
};
