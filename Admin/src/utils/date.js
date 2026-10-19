// Jobvia / Admin / src / utils / date.js

/* -------- Get Today's Date -------- */
export const getTodayDate = () => new Date().toISOString().split("T")[0];

/* -------- Format Date (DD/MM/YYYY) -------- */
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return dateString;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
