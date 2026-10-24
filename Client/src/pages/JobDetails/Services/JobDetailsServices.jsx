import {
  fetchAppliedJobs,
  fetchJobDetails,
  fetchUserProfile,
} from "../../../services/fetch";
import { applyForJob, toggleSaveJob } from "../../../services/mutations";
import { toast } from "react-toastify";

/* -------- Fetch job details -------- */
export const fetchJobDetailsService = async (
  id,
  BASE_URL,
  setJob,
  setLoading,
) => {
  setLoading(true);

  try {
    const data = await fetchJobDetails(id);

    if (data.success) {
      const bJob = data.job;

      setJob({
        id: bJob._id,
        role: bJob.roleName,
        company: bJob.companyName,
        techStack: bJob.techStack,
        location: bJob.location,
        experience: bJob.experience,
        salary: bJob.salary,
        salaryType: (bJob.salaryType || "").replace("/", "") || "month",
        category: bJob.category,
        jobType: bJob.jobType,
        logo: bJob.companyLogo?.startsWith("http")
          ? bJob.companyLogo
          : `${BASE_URL}${bJob.companyLogo || ""}`,
        datePosted: bJob.postDate || bJob.createdAt,
        overview: bJob.overview,
        responsibilities: bJob.responsibilities,
        jobCriteria: bJob.jobCriteria,
        education: bJob.education,
        openings: bJob.openings,
      });
    }
  } finally {
    setLoading(false);
  }
};

/* -------- Toggle saved job -------- */
export const toggleSaveJobService = async (
  job,
  STORAGE_JOBS_KEY,
  setSavedJobs,
) => {
  if (!job?.id) {
    return;
  }

  try {
    const data = await toggleSaveJob(job.id);

    if (!data?.success) {
      return;
    }

    setSavedJobs((prev) => {
      const idStr = String(job.id);
      const next = prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr];

      try {
        localStorage.setItem(STORAGE_JOBS_KEY, JSON.stringify(next));
      } catch {
        // Ignore localStorage errors.
      }

      return next;
    });
  } catch {
    // The API function already displays the error toast.
  }
};

/* -------- Fetch applied jobs -------- */
export const fetchAppliedJobsService = async (
  STORAGE_KEY,
  STORAGE_APPLIED_KEY,
  setAppliedJobs,
) => {
  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) {
      return;
    }

    const data = await fetchAppliedJobs();

    if (data.success) {
      const jobIds = data.applications
        .map((app) => app.job?._id || app.job)
        .filter((id) => id)
        .map((id) => String(id));

      setAppliedJobs(jobIds);
      localStorage.setItem(STORAGE_APPLIED_KEY, JSON.stringify(jobIds));
    }
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
  }
};

/* -------- Update applied jobs -------- */
export const applyJobOnceService = (
  jobId,
  STORAGE_APPLIED_KEY,
  setAppliedJobs,
) => {
  setAppliedJobs((prev) => {
    const idStr = String(jobId);

    if (prev.includes(idStr)) {
      return prev;
    }

    const next = [...prev, idStr];

    try {
      localStorage.setItem(STORAGE_APPLIED_KEY, JSON.stringify(next));
    } catch {
      // Ignore localStorage errors.
    }

    return next;
  });
};

/* -------- Open application confirmation popup -------- */
export const openConfirmPopupService = async (
  job,
  appliedJobs,
  STORAGE_KEY,
  setPopupConfirm,
) => {
  if (!job || appliedJobs.includes(String(job.id))) {
    return;
  }

  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) {
      toast.error("Please log in to apply for this job.");
      return;
    }

    const data = await fetchUserProfile();

    if (data.success && (!data.user.phone || !data.user.resume)) {
      toast.error(
        "Please complete your profile by adding your phone number and resume before applying.",
      );
      return;
    }
  } catch (error) {
    console.error("Error checking profile:", error);
  }

  setPopupConfirm(true);
};

/* -------- Confirm job application -------- */
export const confirmApplyService = async (
  job,
  isApplying,
  STORAGE_KEY,
  setIsApplying,
  setPopupConfirm,
  applyJobOnce,
) => {
  if (!job?.id || isApplying) {
    return;
  }

  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) {
      toast.error("Please log in to apply for this job.");
      setPopupConfirm(false);
      return;
    }

    setIsApplying(true);

    const data = await applyForJob(job.id);

    if (
      data?.success ||
      data?.message === "You have already applied for this job"
    ) {
      applyJobOnce(job.id);
    }
  } catch (error) {
    console.error("Error applying for job:", error);
  } finally {
    setIsApplying(false);
    setPopupConfirm(false);
  }
};

/* -------- Close confirmation popup -------- */
export const closeConfirmPopupService = (isApplying, setPopupConfirm) => {
  if (isApplying) {
    return;
  }

  setPopupConfirm(false);
};
