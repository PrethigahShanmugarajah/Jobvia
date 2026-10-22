// Jobvia / Client / src / constants / categoryColors.js

/* -------- Get category badge colors -------- */
export const getCategoryColor = (category) => {
  const colors = {
    Engineering: "bg-blue-100 text-blue-700 border-blue-200",
    IT: "bg-gray-100 text-gray-700 border-gray-200",
    "Data Science": "bg-purple-100 text-purple-700 border-purple-200",
    Design: "bg-pink-100 text-pink-700 border-pink-200",
    Product: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Marketing: "bg-green-100 text-green-700 border-green-200",
    Sales: "bg-red-100 text-red-700 border-red-200",
    Finance: "bg-indigo-100 text-indigo-700 border-indigo-200",
  };

  return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
};

