// Jobvia / Admin / src / services / mutations.js
import api from "../api/axios";
import API_ROUTES from "../api/api_route";
import { toast } from "react-toastify";

/* -------- Admin Login -------- */
export const loginAdmin = async (email, password) => {
  try {
    const { data } = await api.post(API_ROUTES.AUTH.LOGIN, {
      email,
      password,
    });

    console.log("Admin Login API Response:", data);

    if (data?.user?.role !== "admin") {
      toast.error("Access denied. Admins only.");
      return null;
    }

    if (data?.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("userUpdated"));

      toast.success(data?.message);
      console.log("Admin Login Job Success:", data?.message);
    } else {
      toast.warn(data?.message || "Admin Login with warning");
      console.warn(
        "Admin Login Warning:",
        data?.message || "Admin Login Warning",
      );
    }
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.error("Admin Login Error:", error);

    throw error;
  }
};

/* -------- Close Dashboard Job -------- */
export const closeDashboardJob = async (jobId) => {
  try {
    const { data } = await api.patch(API_ROUTES.JOB.CLOSE(jobId));

    console.log("Close Dashboard Job API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Close Dashboard Job Success:", data?.message);
    } else {
      toast.warn(data?.message || "Close dashboard job with warning");
      console.warn(
        "Close Dashboard Job Warning:",
        data?.message || "Close Dashboard Job Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Close Dashboard Job Error:", error);

    throw error;
  }
};
