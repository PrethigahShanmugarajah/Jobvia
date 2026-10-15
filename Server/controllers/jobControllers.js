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

    if (!roleName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job role name cannot be empty.",
      });
    }

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    if (!companyName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name cannot be empty.",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Job location is required.",
      });
    }

    if (!location.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job location cannot be empty.",
      });
    }

    if (!experience) {
      return res.status(400).json({
        success: false,
        message: "Job experience is required.",
      });
    }

    if (!experience.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job experience cannot be empty.",
      });
    }

    if (salary == null) {
      return res.status(400).json({
        success: false,
        message: "Salary is required.",
      });
    }

    if (Number.isNaN(Number(salary))) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid salary.",
      });
    }

    if (!jobType) {
      return res.status(400).json({
        success: false,
        message: "Job type is required.",
      });
    }

    if (!jobType.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job type cannot be empty.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Job category is required.",
      });
    }

    if (!category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job category cannot be empty.",
      });
    }

    if (openings == null) {
      return res.status(400).json({
        success: false,
        message: "Number of job openings is required.",
      });
    }

    if (Number.isNaN(Number(openings))) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid number of job openings.",
      });
    }

    if (!overview) {
      return res.status(400).json({
        success: false,
        message: "Job overview is required.",
      });
    }

    if (!overview.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job overview cannot be empty.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Company logo is required.",
      });
    }

    try {
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
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format for job requirements.",
      });
    }

    if (!techStack) {
      return res.status(400).json({
        success: false,
        message: "Technology stack is required.",
      });
    }

    if (!Array.isArray(techStack)) {
      return res.status(400).json({
        success: false,
        message: "Technology stack must be an array.",
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

    if (!Array.isArray(responsibilities)) {
      return res.status(400).json({
        success: false,
        message: "Job responsibilities must be an array.",
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

    if (!Array.isArray(jobCriteria)) {
      return res.status(400).json({
        success: false,
        message: "Job criteria must be an array.",
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

    if (!Array.isArray(education)) {
      return res.status(400).json({
        success: false,
        message: "Education requirements must be an array.",
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

      if (Number.isNaN(postDateValue.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid post date.",
        });
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

    if (!companyLogo) {
      return res.status(400).json({
        success: false,
        message: "Company logo is required.",
      });
    }

    if (!companyLogo.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company logo cannot be empty.",
      });
    }

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

/* -------- Get Jobs By Admin -------- */
export const getJobsByAdmin = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    const applicationStats = await Application.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userRecord",
        },
      },

      { $unwind: "$userRecord" },

      { $group: { _id: "$job", count: { $sum: 1 } } },
    ]);

    const countsMap = applicationStats.reduce((acc, curr) => {
      acc[curr._id.toString()] = curr.count;
      return acc;
    }, {});

    const jobsWithStats = jobs.map((job) => ({
      ...job._doc,
      applicantsCount: countsMap[job._id.toString()] || 0,
    }));

    return res.status(200).json({
      success: true,
      message:
        jobsWithStats.length === 0
          ? "No jobs found."
          : jobsWithStats.length === 1
            ? "Job retrieved successfully."
            : "Jobs retrieved successfully.",
      count: jobs.length,
      jobs: jobsWithStats,
    });
  } catch (error) {
    console.error(
      "Get Jobs By Admin Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving jobs.",
      error: `Get Jobs By Admin Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Jobs -------- */
export const getJobs = async (req, res) => {
  try {
    const {
      roleName,
      companyName,
      location,
      category,
      jobType,
      experience,
      minSalary,
      maxSalary,
      search,
    } = req.query;

    const query = { status: "active" };

    if (search) {
      query.$or = [
        { roleName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { techStack: { $regex: search, $options: "i" } },
      ];
    }

    if (roleName) {
      query.roleName = { $regex: roleName, $options: "i" };
    }

    if (companyName) {
      query.companyName = { $regex: companyName, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (experience) {
      query.experience = { $regex: experience, $options: "i" };
    }

    if (category) {
      const categories = Array.isArray(category)
        ? category
        : category.split(",");
      query.category = { $in: categories.map((cat) => new RegExp(cat, "i")) };
    }

    if (jobType) {
      const types = Array.isArray(jobType) ? jobType : jobType.split(",");
      const normalizeTypeToRegex = (type) => {
        const raw = String(type).trim();
        const escaped = raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const normalized = escaped.replace(/[-_\s]+/g, "[-_\\s]*");
        return new RegExp(`^${normalized}$`, "i");
      };
      query.jobType = { $in: types.map(normalizeTypeToRegex) };
    }

    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = Number(minSalary);
      if (maxSalary) query.salary.$lte = Number(maxSalary);
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        jobs.length === 0
          ? "No jobs found."
          : jobs.length === 1
            ? "Job retrieved successfully."
            : "Jobs retrieved successfully.",
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving jobs.",
      error: `Get Jobs Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Job -------- */
export const getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job retrieved successfully.",
      job,
    });
  } catch (error) {
    console.error("Get Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving the job.",
      error: `Get Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Update Job -------- */
export const updateJob = async (req, res) => {
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

    /* -------- Handle arrays if sent as JSON strings from frontend FormData -------- */
    try {
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
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format for job requirements.",
      });
    }

    let postDateValue;

    if (postDate) {
      if (
        typeof postDate === "string" &&
        /^\d{4}-\d{2}-\d{2}$/.test(postDate)
      ) {
        const [year, month, day] = postDate.split("-");
        /* -------- Use UTC to prevent timezone shifts across days -------- */
        postDateValue = new Date(
          Date.UTC(Number(year), Number(month) - 1, Number(day)),
        );
      } else {
        postDateValue = new Date(postDate);
      }

      if (Number.isNaN(postDateValue.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Please provide a valid post date.",
        });
      }
    } else {
      postDateValue = new Date();
    }

    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    /* -------- Admins can update any job -------- */
    let companyLogo = job.companyLogo;

    if (req.file) {
      const uploadRes = await uploadToCloudinary(
        req.file.buffer,
        "jobvia/logos",
        "image",
        req.file.originalname,
      );
      companyLogo = uploadRes.secure_url;
    }

    if (!companyLogo) {
      return res.status(400).json({
        success: false,
        message: "A company logo is required to update this job.",
      });
    }

    if (!roleName) {
      return res.status(400).json({
        success: false,
        message: "Job role is required.",
      });
    }

    if (!roleName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job role cannot be empty.",
      });
    }

    if (!companyName) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    if (!companyName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name cannot be empty.",
      });
    }

    if (!techStack) {
      return res.status(400).json({
        success: false,
        message: "Technology stack is required.",
      });
    }

    if (!Array.isArray(techStack)) {
      return res.status(400).json({
        success: false,
        message: "Technology stack must be an array.",
      });
    }

    if (techStack.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one technology is required in the technology stack.",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Job location is required.",
      });
    }

    if (!location.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job location cannot be empty.",
      });
    }

    if (!experience) {
      return res.status(400).json({
        success: false,
        message: "Experience is required.",
      });
    }

    if (!experience.trim()) {
      return res.status(400).json({
        success: false,
        message: "Experience cannot be empty.",
      });
    }

    if (salary == null) {
      return res.status(400).json({
        success: false,
        message: "Salary is required.",
      });
    }

    if (Number.isNaN(Number(salary))) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid salary.",
      });
    }

    if (!jobType) {
      return res.status(400).json({
        success: false,
        message: "Job type is required.",
      });
    }

    if (!jobType.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job type cannot be empty.",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Job category is required.",
      });
    }

    if (!category.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job category cannot be empty.",
      });
    }

    if (openings == null) {
      return res.status(400).json({
        success: false,
        message: "Number of openings is required.",
      });
    }

    if (Number.isNaN(Number(openings))) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid number of openings.",
      });
    }

    if (!overview) {
      return res.status(400).json({
        success: false,
        message: "Job overview is required.",
      });
    }

    if (!overview.trim()) {
      return res.status(400).json({
        success: false,
        message: "Job overview cannot be empty.",
      });
    }

    if (!responsibilities) {
      return res.status(400).json({
        success: false,
        message: "Job responsibilities are required.",
      });
    }

    if (!Array.isArray(responsibilities)) {
      return res.status(400).json({
        success: false,
        message: "Job responsibilities must be an array.",
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

    if (!Array.isArray(jobCriteria)) {
      return res.status(400).json({
        success: false,
        message: "Job criteria must be an array.",
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

    if (!Array.isArray(education)) {
      return res.status(400).json({
        success: false,
        message: "Education requirements must be an array.",
      });
    }

    if (education.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one education requirement is required.",
      });
    }
    job = await Job.findByIdAndUpdate(
      req.params.id,
      {
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
      },
      { returnDocument: "after", runValidators: true },
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully.",
      job,
    });
  } catch (error) {
    console.error("Update Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while updating the job.",
      error: `Update Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Delete Job -------- */
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    await Application.deleteMany({ job: req.params.id });
    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "Job deleted successfully, and associated applications were removed.",
    });
  } catch (error) {
    console.error("Delete Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while deleting the job.",
      error: `Delete Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Close Job -------- */
export const closeJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    job.status = "closed";
    await job.save();

    return res.status(200).json({
      success: true,
      message: "Job closed successfully.",
    });
  } catch (error) {
    console.error("Close Job Error:", error?.stack || error?.message || error);

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while closing the job.",
      error: `Close Job Error: ${error?.stack || error?.message || error}`,
    });
  }
};
