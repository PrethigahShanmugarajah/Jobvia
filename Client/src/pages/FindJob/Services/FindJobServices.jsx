// Jobvia / Client / src / pages / FindJob / Services / FindJobServices.jsx
import { toast } from "react-toastify";
import { applyForJob, toggleSaveJob } from "../../../services/mutations";
import {
  fetchAppliedJobs,
  fetchJobs,
  fetchSavedJobs,
  fetchUserProfile,
} from "../../../services/fetch";

/* -------- Handle save job -------- */
export const toggleSaveJobService = async (
  jobId,
  STORAGE_KEY,
  STORAGE_JOBS_KEY,
  setSavedJobs,
) => {
  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) {
      toast.error("Please log in to save this job.");
      return;
    }

    const data = await toggleSaveJob(jobId);

    if (data.success) {
      const jobIds = data.savedJobs.map((id) => String(id));
      setSavedJobs(jobIds);
      localStorage.setItem(STORAGE_JOBS_KEY, JSON.stringify(jobIds));
    }
  } catch (error) {
    console.error("Error saving job:", error);
  }
};

/* -------- Handle opening application confirmation -------- */
export const openConfirmPopupService = async (
  job,
  appliedJobs,
  STORAGE_KEY,
  setSelectedJob,
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

  setSelectedJob({
    jobId: String(job.id),
    role: job.role,
    company: job.company,
  });
};

/* -------- Handle job application -------- */
export const confirmApplyService = async (
  selectedJob,
  isApplying,
  STORAGE_KEY,
  setIsApplying,
  setSelectedJob,
  applyJobOnce,
) => {
  if (!selectedJob?.jobId || isApplying) {
    return;
  }

  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) {
      toast.error("Please log in to apply for this job.");
      setSelectedJob(null);
      return;
    }

    setIsApplying(true);

    const data = await applyForJob(selectedJob.jobId);

    if (
      data?.success ||
      data?.message === "You have already applied for this job"
    ) {
      applyJobOnce(selectedJob.jobId);
    }
  } finally {
    setIsApplying(false);
    setSelectedJob(null);
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

    if (data?.success) {
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

/* -------- Fetch saved jobs -------- */
export const fetchSavedJobsService = async (
  STORAGE_KEY,
  STORAGE_JOBS_KEY,
  setSavedJobs,
) => {
  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) {
      return;
    }

    const data = await fetchSavedJobs();

    if (data?.success) {
      const jobIds = data.savedJobs.map((job) => String(job._id || job));

      setSavedJobs(jobIds);
      localStorage.setItem(STORAGE_JOBS_KEY, JSON.stringify(jobIds));
    }
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
  }
};

/* -------- Fetch and filter jobs -------- */
export const fetchJobsService = async (
  searchTerm,
  filters,
  BASE_URL,
  setLoading,
  setJobs,
  setFilteredJobs,
) => {
  setLoading(true);

  try {
    const params = new URLSearchParams();

    if (searchTerm.company) {
      params.append("companyName", searchTerm.company);
    }

    if (searchTerm.location) {
      params.append("location", searchTerm.location);
    }

    if (searchTerm.role) {
      params.append("roleName", searchTerm.role);
    }

    if (searchTerm.experience) {
      params.append("experience", searchTerm.experience);
    }

    if (filters.jobType.length > 0) {
      params.append("jobType", filters.jobType.join(","));
    }

    if (filters.category.length > 0) {
      params.append("category", filters.category.join(","));
    }

    if (filters.minSalary) {
      params.append("minSalary", filters.minSalary);
    }

    if (filters.maxSalary) {
      params.append("maxSalary", filters.maxSalary);
    }

    const data = await fetchJobs(params);

    if (data.success) {
      const mappedJobs = data.jobs.map((job) => {
        let logoSrc = "";

        if (job.companyLogo) {
          if (job.companyLogo.startsWith("http")) {
            logoSrc = job.companyLogo;
          } else {
            const path = job.companyLogo.startsWith("/")
              ? job.companyLogo
              : `/${job.companyLogo}`;

            logoSrc = `${BASE_URL}${path
              .split("/")
              .map((segment) => encodeURIComponent(segment))
              .join("/")}`;
          }
        }

        return {
          id: job._id,
          role: job.roleName,
          company: job.companyName,
          techStack: job.techStack,
          location: job.location,
          experience: job.experience,
          experienceLevel: job.experience,
          salary: job.salary,
          salaryType: (job.salaryType || "").replace("/", "") || "month",
          category: job.category,
          jobType: job.jobType,
          logo: logoSrc,
          datePosted: job.postDate || job.createdAt,
          ...job,
        };
      });

      setJobs(mappedJobs);
      setFilteredJobs(mappedJobs);
    }
  } finally {
    setLoading(false);
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
      //
    }

    return next;
  });
};

/* -------- Close confirmation popup -------- */
export const closeConfirmPopupService = (isApplying, setSelectedJob) => {
  if (isApplying) {
    return;
  }
  setSelectedJob(null);
};
