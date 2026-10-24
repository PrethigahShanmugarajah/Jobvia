/* -------- Format salary -------- */
export const formatSalary = (salary, salaryType, CURRENCY) => {
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

  return `${CURRENCY}${Number(salary).toLocaleString()}/${suffix}`;
};
