// Jobvia / Admin / src / services / fetch.js
import api from "../api/axios";
import API_ROUTES from "../api/api_route";
import { toast } from "react-toastify";

/* -------- Fetch Dashboard Stats -------- */
export const fetchDashboardStats = async () => {
  try {
    const { data } = await api.get(API_ROUTES.JOB.ADMIN_STATS);

    console.log("Fetch Dashboard Stats API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Dashboard Stats Success:", data?.message);
    } else {
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

    console.log("Fetch Dashboard Jobs API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Dashboard Jobs Success:", data?.message);
    } else {
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

    console.log("Fetch Companies API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Companies Success:", data?.message);
    } else {
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

    console.log("Fetch Interview Companies API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Interview Companies Success:", data?.message);
    } else {
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
