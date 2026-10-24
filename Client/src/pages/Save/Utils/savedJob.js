/* -------- Transform saved jobs -------- */
export const getSavedJobItems = (jobs, BASE_URL) =>
  jobs.map((job) => ({
    source: "job",
    id: job._id,
    job: {
      ...job,
      id: job._id,
      role: job.roleName,
      company: job.companyName,
      logo: job.companyLogo?.startsWith("http")
        ? job.companyLogo
        : `${BASE_URL}${job.companyLogo || ""}`,
      datePosted: job.postDate || job.createdAt,
    },
    raw: String(job._id),
  }));
