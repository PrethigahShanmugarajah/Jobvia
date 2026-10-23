// Jobvia / Client / src / pages / Save / Utils / companyNames.js

/* -------- Get company names from saved questions -------- */
export const getCompanyNames = (companies = []) =>
  companies
    .map((company) => {
      if (!company) return "";
      if (typeof company === "string" || typeof company === "number")
        return String(company);

      return (
        company.companyName ||
        company.name ||
        String(company._id || company.id || "")
      );
    })
    .filter(Boolean);
