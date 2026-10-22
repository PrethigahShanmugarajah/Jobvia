// Jobvia / Client / src / pages / FindJob / Utils / jobFormatters.js
import { jobTypeOptions } from "../Data/jobTypeOptions";

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

/* -------- Format job posting date -------- */
export const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const now = new Date();

  const d1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = d2 - d1;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "In the future";
  }

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "1 day ago";
  }

  if (diffDays < 30) {
    return `${diffDays} days ago`;
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  const years = Math.floor(diffDays / 365);
  return `${years} year${years === 1 ? "" : "s"} ago`;
};

/* -------- Format salary for display -------- */
export const formatSalary = (salary, salaryType) => {
  if (salary === undefined || salary === null) {
    return "";
  }

  const type = (salaryType || "").toLowerCase();
  const shorthands = {
    hour: "h",
    day: "d",
    week: "w",
    month: "m",
    year: "y",
  };
  const suffix = shorthands[type] || "m";

  return `${Number(salary).toLocaleString()}/${suffix}`;
};
