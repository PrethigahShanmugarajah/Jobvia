// Jobvia / Client / src / pages / FindJob / Constants / getJobTypeColor.js

/* -------- Get job type badge colors -------- */
export const getJobTypeColor = (type) => {
  if (!type) return "bg-gray-100 text-gray-700 border-gray-200";
  const normalizedType = type
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ");

  const colors = {
    "full time": "bg-green-100 text-green-700 border-green-200",
    "part time": "bg-yellow-100 text-yellow-700 border-yellow-200",
    contract: "bg-orange-100 text-orange-700 border-orange-200",
    internship: "bg-pink-100 text-pink-700 border-pink-200",
  };

  return colors[normalizedType] || "bg-gray-100 text-gray-700 border-gray-200";
};
