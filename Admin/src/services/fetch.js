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
