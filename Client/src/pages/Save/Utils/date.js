// Jobvia / Client / src / pages / Save / Utils / date.js

/* -------- Format saved item date -------- */
export const formatSavedDate = (date) =>
  date ? new Date(date).toLocaleDateString() : "";
