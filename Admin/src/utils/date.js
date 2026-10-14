// Jobvia / Admin / src / utils / date.js

/* -------- Get Today's Date -------- */
export const getTodayDate = () => new Date().toISOString().split("T")[0];
