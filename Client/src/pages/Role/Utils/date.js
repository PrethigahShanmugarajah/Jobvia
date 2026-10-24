/* -------- Format Date as Time Ago -------- */
export const timeAgo = (dateString) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "Yesterday";
  }

  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  }

  if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} months ago`;
  }

  return `${Math.floor(diffDays / 365)} years ago`;
};
