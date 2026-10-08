// Jobvia / Server / controllers / companyControllers.js
import Company from "../models/Company.js";

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
      error: `Get Companies Error: ${error?.stack || error?.message || error}`,
    });
  }
};
