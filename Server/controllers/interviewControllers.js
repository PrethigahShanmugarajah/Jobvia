// Jobvia / Server / controllers / interviewControllers.js
import InterviewRole from "../models/InterviewRole.js";
import mongoose from "mongoose";
import RoleQuestion from "../models/RoleQuestion.js";
import {
  parseQuestions,
  replaceQuestions,
  uploadFiles,
} from "../utils/helpers.js";
import InterviewCompany from "../models/InterviewCompany.js";
import InterviewQuestion from "../models/InterviewQuestion.js";

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

/* -------- Get Questions By Role -------- */
export const getQuestionsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview role ID.",
      });
    }

    const [role, questions] = await Promise.all([
      InterviewRole.findById(roleId),
      RoleQuestion.find({ roleId }).sort({ createdAt: -1 }),
    ]);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Interview role not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        questions.length === 0
          ? "No questions found for this interview role."
          : questions.length === 1
            ? "Question retrieved successfully."
            : "Questions retrieved successfully.",
      role,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error(
      "Get Questions By Role Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving questions for this interview role.",
      error: `Get Questions By Role Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Add Interview Role -------- */
export const addInterviewRole = async (req, res) => {
  try {
    const { roleName, questionsCount, questionsData } = req.body;

    const normalizedRoleName =
      typeof roleName === "string" ? roleName.trim() : roleName;

    if (typeof roleName !== "string") {
      return res.status(400).json({
        success: false,
        message: "Role name must be a valid string.",
      });
    }

    if (!roleName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Role name is required.",
      });
    }

    if (questionsCount == null) {
      return res.status(400).json({
        success: false,
        message: "Questions count is required.",
      });
    }

    if (!Number.isInteger(Number(questionsCount))) {
      return res.status(400).json({
        success: false,
        message: "Questions count must be a valid integer.",
      });
    }

    if (Number(questionsCount) < 0) {
      return res.status(400).json({
        success: false,
        message: "Questions count cannot be negative.",
      });
    }

    const exists = await InterviewRole.findOne({
      roleName: normalizedRoleName,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "An interview role with this name already exists.",
      });
    }

    const uploads = await uploadFiles(req.files, {
      imageFile: { folder: "jobvia/roles", type: "image" },
      csvFile: { folder: "jobvia/csv", type: "raw" },
    });

    const role = await InterviewRole.create({
      roleName: normalizedRoleName,
      image: uploads.imageFile || "",
      questionsCount: Number(questionsCount),
      csvFileUrl: uploads.csvFile || "",
      createdBy: req.user.id,
    });

    if (questionsData) {
      const formatted = parseQuestions(
        questionsData,
        "role",
        role._id,
        req.user.id,
      );

      await RoleQuestion.insertMany(formatted);
    }

    return res.status(201).json({
      success: true,
      message: "Interview role created successfully.",
      role,
    });
  } catch (error) {
    console.error(
      "Add Interview Role Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while creating the interview role.",
      error: `Add Interview Role Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Update Interview Role -------- */
export const updateInterviewRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview role ID.",
      });
    }

    const { roleName, questionsCount, questionsData } = req.body;

    const role = await InterviewRole.findById(roleId);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Interview role not found.",
      });
    }

    if (roleName !== undefined) {
      if (typeof roleName !== "string") {
        return res.status(400).json({
          success: false,
          message: "Role name must be a valid string.",
        });
      }

      if (!roleName.trim()) {
        return res.status(400).json({
          success: false,
          message: "Role name cannot be empty.",
        });
      }

      if (/^\d+$/.test(roleName.trim())) {
        return res.status(400).json({
          success: false,
          message: "Role name cannot contain only numbers.",
        });
      }

      role.roleName = roleName.trim();
    }

    if (questionsCount !== undefined) {
      if (questionsCount === null) {
        return res.status(400).json({
          success: false,
          message: "Questions count is required.",
        });
      }

      if (String(questionsCount).trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Questions count cannot be empty.",
        });
      }

      if (!Number.isInteger(Number(questionsCount))) {
        return res.status(400).json({
          success: false,
          message: "Questions count must be a valid integer.",
        });
      }

      if (Number(questionsCount) < 0) {
        return res.status(400).json({
          success: false,
          message: "Questions count cannot be negative.",
        });
      }

      role.questionsCount = Number(questionsCount);
    }

    if (roleName !== undefined) {
      const exists = await InterviewRole.findOne({
        roleName: roleName.trim(),
        _id: { $ne: roleId },
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "An interview role with this name already exists.",
        });
      }
    }

    const uploads = await uploadFiles(req.files, {
      imageFile: { folder: "jobvia/roles", type: "image" },
      csvFile: { folder: "jobvia/csv", type: "raw" },
    });

    if (uploads.imageFile) {
      role.image = uploads.imageFile;
    }

    if (uploads.csvFile) {
      role.csvFileUrl = uploads.csvFile;
    }

    await role.save();

    if (questionsData) {
      const formatted = parseQuestions(
        questionsData,
        "role",
        role._id,
        req.user.id,
      );

      await replaceQuestions(RoleQuestion, { roleId }, formatted);
    }

    return res.status(200).json({
      success: true,
      message: "Interview role updated successfully.",
      role,
    });
  } catch (error) {
    console.error(
      "Update Interview Role Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while updating the interview role.",
      error: `Update Interview Role Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Delete Interview Role -------- */
export const deleteInterviewRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(roleId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview role ID.",
      });
    }

    const role = await InterviewRole.findById(roleId);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: "Interview role not found.",
      });
    }

    await InterviewRole.findByIdAndDelete(roleId);
    await RoleQuestion.deleteMany({ roleId });

    return res.status(200).json({
      success: true,
      message: "Interview role deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Interview Role Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while deleting the interview role.",
      error: `Delete Interview Role Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Interview Companies -------- */
export const getInterviewCompanies = async (req, res) => {
  try {
    const companies = await InterviewCompany.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message:
        companies.length === 0
          ? "No interview companies found."
          : companies.length === 1
            ? "Interview company retrieved successfully."
            : "Interview companies retrieved successfully.",
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.error(
      "Get Interview Companies Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving interview companies.",
      error: `Get Interview Companies Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Get Interview Questions By Company -------- */
export const getInterviewQuestionsByCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview company ID.",
      });
    }

    const [company, questions] = await Promise.all([
      InterviewCompany.findById(companyId),
      InterviewQuestion.find({ company: companyId }).sort({ createdAt: -1 }),
    ]);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Interview company not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        questions.length === 0
          ? "No interview questions found for this company."
          : "Interview questions retrieved successfully.",
      company,
      questionsCount: questions.length,
      questions,
    });
  } catch (error) {
    console.error(
      "Get Interview Questions By Company Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while retrieving interview questions for the company.",
      error: `Get Interview Questions By Company Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Add Interview Company -------- */
export const addInterviewCompany = async (req, res) => {
  try {
    const { companyName, questionsCount, questionsData } = req.body;

    if (typeof companyName !== "string") {
      return res.status(400).json({
        success: false,
        message: "Company name must be a valid string.",
      });
    }

    if (!companyName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Company name is required.",
      });
    }

    if (questionsCount === undefined) {
      return res.status(400).json({
        success: false,
        message: "Questions count is required.",
      });
    }

    if (questionsCount === null) {
      return res.status(400).json({
        success: false,
        message: "Questions count cannot be null.",
      });
    }

    if (questionsCount === "") {
      return res.status(400).json({
        success: false,
        message: "Questions count cannot be empty.",
      });
    }

    const parsedQuestionsCount = Number(questionsCount);

    if (!Number.isInteger(parsedQuestionsCount)) {
      return res.status(400).json({
        success: false,
        message: "Questions count must be an integer.",
      });
    }

    if (parsedQuestionsCount < 1) {
      return res.status(400).json({
        success: false,
        message: "Questions count must be at least 1.",
      });
    }

    const normalizedCompanyName = companyName.trim();

    const exists = await InterviewCompany.findOne({
      companyName: normalizedCompanyName,
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "An interview company with this name already exists.",
      });
    }

    const uploads = await uploadFiles(req.files, {
      logoFile: { folder: "jobvia/logos", type: "image" },
      csvFile: { folder: "jobvia/csv", type: "raw" },
    });

    const company = await InterviewCompany.create({
      companyName: normalizedCompanyName,
      logo: uploads.logoFile || "",
      questionsCount: parsedQuestionsCount,
      csvFileUrl: uploads.csvFile || "",
      createdBy: req.user.id,
    });

    if (questionsData) {
      const formatted = parseQuestions(
        questionsData,
        "company",
        company._id,
        req.user.id,
      );

      await InterviewQuestion.insertMany(formatted);
    }

    return res.status(201).json({
      success: true,
      message: "Interview company created successfully.",
      company,
    });
  } catch (error) {
    console.error(
      "Add Interview Company Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while creating the interview company.",
      error: `Add Interview Company Error: ${error?.stack || error?.message || error}`,
    });
  }
};

/* -------- Update Interview Company -------- */
export const updateInterviewCompany = async (req, res) => {
  try {
    const { companyId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid interview company ID.",
      });
    }

    const { companyName, questionsCount, questionsData } = req.body;

    const company = await InterviewCompany.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Interview company not found.",
      });
    }

    if (companyName !== undefined) {
      if (typeof companyName !== "string") {
        return res.status(400).json({
          success: false,
          message: "Company name must be a valid string.",
        });
      }

      if (!companyName.trim()) {
        return res.status(400).json({
          success: false,
          message: "Company name is required.",
        });
      }

      company.companyName = companyName.trim();
    }

    if (questionsCount !== undefined) {
      if (questionsCount === null) {
        return res.status(400).json({
          success: false,
          message: "Questions count cannot be null.",
        });
      }

      if (questionsCount === "") {
        return res.status(400).json({
          success: false,
          message: "Questions count cannot be empty.",
        });
      }

      if (!Number.isInteger(Number(questionsCount))) {
        return res.status(400).json({
          success: false,
          message: "Questions count must be an integer.",
        });
      }

      if (Number(questionsCount) < 1) {
        return res.status(400).json({
          success: false,
          message: "Questions count must be at least 1.",
        });
      }

      company.questionsCount = Number(questionsCount);
    }

    const uploads = await uploadFiles(req.files, {
      logoFile: { folder: "jobvia/logos", type: "image" },
      csvFile: { folder: "jobvia/csv", type: "raw" },
    });

    if (uploads.logoFile) {
      company.logo = uploads.logoFile;
    }

    if (uploads.csvFile) {
      company.csvFileUrl = uploads.csvFile;
    }

    await company.save();

    if (questionsData) {
      const formatted = parseQuestions(
        questionsData,
        "company",
        company._id,
        req.user.id,
      );

      await replaceQuestions(
        InterviewQuestion,
        { company: companyId },
        formatted,
      );
    }

    return res.status(200).json({
      success: true,
      message: "Interview company updated successfully.",
      company,
    });
  } catch (error) {
    console.error(
      "Update Interview Company Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message:
        "An unexpected error occurred while updating the interview company.",
      error: `Update Interview Company Error: ${error?.stack || error?.message || error}`,
    });
  }
};
