import Company from "../models/Company.js";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";

/* -------- Get Companies -------- */
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();

    return res.status(200).json({
      success: true,
      message:
        companies.length === 0
          ? "No companies found."
          : companies.length === 1
            ? "Company retrieved successfully."
            : "Companies retrieved successfully.",
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.error(
      "Get Companies Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while retrieving companies.",
    });
  }
};

/* -------- Add Company -------- */
export const addCompany = async (req, res) => {
  try {
    const { website } = req.body;

    if (!website) {
      return res.status(400).json({
        success: false,
        message: "Website is required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Company logo is required.",
      });
    }

    let logoUrl = "";

    const uploadResult = await uploadToCloudinary(
      req.file.buffer,
      "jobvia/logos",
      "image",
      req.file.originalname,
    );

    logoUrl = uploadResult.secure_url;

    const company = await Company.create({
      logo: logoUrl,
      website,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully.",
      company,
    });
  } catch (error) {
    console.error(
      "Add Company Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while creating the company.",
    });
  }
};

/* -------- Delete Company -------- */
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    await company.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Company deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Company Error:",
      error?.stack || error?.message || error,
    );

    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred while deleting the company.",
    });
  }
};
