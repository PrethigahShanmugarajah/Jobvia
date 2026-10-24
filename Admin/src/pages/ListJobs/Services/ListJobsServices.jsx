import { fetchAdminJobs } from "../../../services/fetch";
import {
  deleteDashboardJob,
  updateDashboardJob,
} from "../../../services/mutations";

/* -------- Map job data -------- */
export const mapBackToFrontendService = (bJob, BASE_URL) => {
  return {
    id: bJob._id,
    image:
      bJob.companyLogo?.startsWith("http") ||
      bJob.companyLogo?.startsWith("data:")
        ? bJob.companyLogo
        : `${BASE_URL}${bJob.companyLogo || ""}`,
    role: bJob.roleName,
    company: bJob.companyName,
    techstack: bJob.techStack,
    locations: [bJob.location],
    experience: bJob.experience,
    salary: {
      amount: bJob.salary,
      period: (bJob.salaryType || "").replace("/", "") || "month",
    },
    jobType: bJob.jobType,
    postDate: bJob.postDate
      ? new Date(bJob.postDate).toISOString().split("T")[0]
      : "",
    category: bJob.category,
    openings: bJob.openings,
    overview: bJob.overview,
    responsibilities: bJob.responsibilities,
    criteria: bJob.jobCriteria,
    education: bJob.education,
  };
};

/* -------- Fetch jobs -------- */
export const fetchJobsService = async (BASE_URL) => {
  const response = await fetchAdminJobs();

  if (response.success) {
    return response.jobs.map((job) => mapBackToFrontendService(job, BASE_URL));
  }

  return [];
};

/* -------- Delete job -------- */
export const deleteJobService = async (id) => {
  return await deleteDashboardJob(id);
};

/* -------- Update job -------- */
export const updateJobService = async (jobId, formDataToSend) => {
  return await updateDashboardJob(jobId, formDataToSend);
};

/* -------- Build job form data -------- */
export const buildJobFormDataService = async (editingJob) => {
  const formDataToSend = new FormData();

  formDataToSend.append("roleName", editingJob.role || "");
  formDataToSend.append("companyName", editingJob.company || "");
  formDataToSend.append(
    "location",
    editingJob.locations && editingJob.locations.length > 0
      ? editingJob.locations[0]
      : "",
  );
  formDataToSend.append("experience", editingJob.experience || "");
  formDataToSend.append("salary", editingJob.salary?.amount || 0);
  formDataToSend.append("salaryType", editingJob.salary?.period || "month");
  formDataToSend.append("jobType", editingJob.jobType || "");
  formDataToSend.append("postDate", editingJob.postDate || "");
  formDataToSend.append("category", editingJob.category || "");
  formDataToSend.append("openings", editingJob.openings || 1);
  formDataToSend.append("overview", editingJob.overview || "");

  formDataToSend.append(
    "techStack",
    JSON.stringify(editingJob.techstack || []),
  );

  formDataToSend.append(
    "responsibilities",
    JSON.stringify(editingJob.responsibilities || []),
  );

  formDataToSend.append(
    "jobCriteria",
    JSON.stringify(editingJob.criteria || []),
  );

  formDataToSend.append(
    "education",
    JSON.stringify(editingJob.education || []),
  );

  if (editingJob.image && editingJob.image.startsWith("data:")) {
    const response = await fetch(editingJob.image);
    const blob = await response.blob();
    formDataToSend.append("companyLogo", blob, "logo.png");
  }

  return formDataToSend;
};

/* -------- Manage array fields -------- */
export const addArrayItemService = (editingJob, setEditingJob, field, item) => {
  if (!item || !item.trim()) return;

  setEditingJob((prev) => {
    if (!prev) return prev;

    return {
      ...prev,
      [field]: [...(prev[field] || []), item.trim()],
    };
  });
};

/* -------- Remove array item -------- */
export const removeArrayItemService = (setEditingJob, field, index) => {
  setEditingJob((prev) => {
    if (!prev) return prev;

    return {
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    };
  });
};

/* -------- Manage locations -------- */
export const saveEditLocationService = (
  editingJob,
  setEditingJob,
  editingLocationIndex,
  editingLocationText,
) => {
  if (editingLocationIndex === null) return;

  const trimmed = (editingLocationText || "").trim();

  setEditingJob((prev) => {
    if (!prev) return prev;

    const locations = Array.isArray(prev.locations) ? [...prev.locations] : [];

    if (!trimmed) {
      locations.splice(editingLocationIndex, 1);
    } else {
      locations[editingLocationIndex] = trimmed;
    }

    return { ...prev, locations };
  });
};

/* -------- Filter jobs -------- */
export const filterJobsService = (jobs, companyFilter) => {
  return jobs.filter((job) =>
    job.company.toLowerCase().includes(companyFilter.trim().toLowerCase()),
  );
};
