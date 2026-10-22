// Jobvia / Client / src / constants / getExperienceColor.js

/* -------- Get experience level badge colors -------- */
export const getExperienceColor = (level) => {
  const colors = {
    Junior: "bg-green-100 text-green-700 border-green-200",
    "Mid-Level": "bg-blue-100 text-blue-700 border-blue-200",
    "Mid-Senior": "bg-purple-100 text-purple-700 border-purple-200",
    Senior: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  return colors[level] || "bg-gray-100 text-gray-700 border-gray-200";
};
