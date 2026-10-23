// Jobvia / Client / src / utils / jobFormatters.js
import { jobTypeOptions } from "../data/jobTypeOptions";

/* -------- Normalize job type for display -------- */
export const normalizeJobTypeForDisplay = (value) => {
  if (!value) {
    return "";
  }

  const option = jobTypeOptions.find((opt) => opt.value === value);

  if (option) {
    return option.label;
  }

  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};
