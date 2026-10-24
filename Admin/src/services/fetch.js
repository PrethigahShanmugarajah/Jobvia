import api from "../api/axios";
import API_ROUTES from "../api/api_route";
import { toast } from "react-toastify";

/* -------- Fetch Dashboard Stats -------- */
export const fetchDashboardStats = async () => {
  try {
    const { data } = await api.get(API_ROUTES.JOB.ADMIN_STATS);

    if (!data?.success) {
      toast.warn(data?.message || "Fetch dashboard stats with warning");
      console.warn(
        "Fetch Dashboard Stats Warning:",
        data?.message || "Fetch Dashboard Stats Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Dashboard Stats Error:", error);

    throw error;
  }
};

/* -------- Fetch Dashboard Jobs -------- */
export const fetchAdminJobs = async () => {
  try {
    const { data } = await api.get(API_ROUTES.JOB.ADMIN_JOBS);

    if (!data?.success) {
      toast.warn(data?.message || "Fetch dashboard jobs with warning");
      console.warn(
        "Fetch Dashboard Jobs Warning:",
        data?.message || "Fetch Dashboard Jobs Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Dashboard Jobs Error:", error);

    throw error;
  }
};

/* -------- Fetch Companies -------- */
export const fetchCompanies = async () => {
  try {
    const { data } = await api.get(API_ROUTES.COMPANY.BASE);

    if (!data?.success) {
      toast.warn(data?.message || "Fetch companies with warning");
      console.warn(
        "Fetch Companies Warning:",
        data?.message || "Fetch Companies Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Companies Error:", error);

    throw error;
  }
};

/* -------- Fetch Interview Companies -------- */
export const fetchInterviewCompanies = async () => {
  try {
    const { data } = await api.get(API_ROUTES.INTERVIEW.COMPANIES);

    if (!data?.success) {
      toast.warn(data?.message || "Fetch interview companies with warning");
      console.warn(
        "Fetch Interview Companies Warning:",
        data?.message || "Fetch Interview Companies Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Interview Companies Error:", error);

    throw error;
  }
};

/* -------- Fetch Interview Roles -------- */
export const fetchInterviewRoles = async () => {
  try {
    const { data } = await api.get(API_ROUTES.INTERVIEW.ROLES);

    if (!data?.success) {
      toast.warn(data?.message || "Fetch interview roles with warning");
      console.warn(
        "Fetch Interview Roles Warning:",
        data?.message || "Fetch Interview Roles Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Interview Roles Error:", error);

    throw error;
  }
};

/* -------- Fetch Applicants -------- */
export const fetchApplicants = async (jobId) => {
  try {
    const { data } = await api.get(API_ROUTES.APPLICATION.APPLICATIONS(jobId));

    if (!data?.success) {
      toast.warn(data?.message || "Failed to fetch applicants");
      console.warn(
        "Fetch Applicants Warning:",
        data?.message || "Fetch Applicants Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Applicants Error:", error);

    throw error;
  }
};

/* -------- Get Resume URL -------- */
export const getResumeUrl = (userId) => {
  return `${api.defaults.baseURL}${API_ROUTES.USER.RESUME(userId)}`;
};
