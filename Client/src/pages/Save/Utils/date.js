/* -------- Format saved item date -------- */
export const formatSavedDate = (date) =>
  date ? new Date(date).toLocaleDateString() : "";
