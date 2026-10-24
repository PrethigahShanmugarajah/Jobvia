import { fetchApplicants, getResumeUrl } from "../../../services/fetch";

/* -------- Load Applicants -------- */
export const fetchApplicantsService = async (jobId, role, setLoading) => {
  setLoading(true);

  try {
    if (!jobId) {
      return [];
    }

    const data = await fetchApplicants(jobId);

    if (!data?.success) {
      return [];
    }

    return (data.applications || []).map((app) => ({
      id: app.applicantId,
      name: app.name,
      email: app.email,
      phone: app.phone,
      appliedForRole: role || data.jobName,
      appliedAt: app.appliedDate,
      resumeFile: app.resume,
      userId: app._id,
    }));
  } finally {
    setLoading(false);
  }
};

/* -------- Get Resume URL -------- */
export const getApplicantResumeUrlService = (resumeUrl, userId) => {
  if (!resumeUrl) {
    return null;
  }

  return getResumeUrl(userId);
};
