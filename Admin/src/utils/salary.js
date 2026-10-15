// Jobvia / Admin / src / utils / salary.js

/* -------- Format salary with amount and payment period -------- */
export const formatSalary = (salary) => {
  if (!salary) {
    return "Not disclosed";
  }

  const { amount, period } = salary;
  const amt = Number(amount || 0).toLocaleString();
  const periodLabel =
    period === "month" ? "/month" : period === "year" ? "/year" : `/${period}`;

  return `$ ${amt} ${periodLabel}`;
};
