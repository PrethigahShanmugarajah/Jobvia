/* -------- Company Color Classes -------- */
export const companyColorClasses = [
  "bg-orange-100 text-orange-600",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
  "bg-red-100 text-red-600",
  "bg-green-100 text-green-600",
];

/* -------- Role Color Classes -------- */
export const roleColorClasses = [
  "bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600",
  "bg-blue-100 text-blue-600",
  "bg-emerald-100 text-emerald-600",
  "bg-pink-100 text-pink-600",
];

/* -------- Get Color Class -------- */
export const getColorClass = (type, name) => {
  const classes = type === "company" ? companyColorClasses : roleColorClasses;

  const index = (name?.length || 0) % classes.length;

  return classes[index];
};
