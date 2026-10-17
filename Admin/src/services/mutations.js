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

/* -------- Create Job -------- */
export const createJob = async (formDataToSend) => {
  try {
    const { data } = await api.post(API_ROUTES.JOB.BASE, formDataToSend);

    console.log("Create Job API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Create Job Success:", data?.message);
    } else {
      toast.warn(data?.message || "Create job with warning");
      console.warn(
        "Create Job Warning:",
        data?.message || "Create Job Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to post job. Please try again.",
    );
    console.error("Create Job Error:", error);

    throw error;
  }
};

/* -------- Delete Dashboard Job -------- */
export const deleteDashboardJob = async (jobId) => {
  try {
    const { data } = await api.delete(`${API_ROUTES.JOB.BASE}/${jobId}`);

    console.log("Delete Dashboard Job API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Delete Dashboard Job Success:", data?.message);
    } else {
      toast.warn(data?.message || "Delete dashboard job with warning");
      console.warn(
        "Delete Dashboard Job Warning:",
        data?.message || "Delete Dashboard Job Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Delete Dashboard Job Error:", error);

    throw error;
  }
};

/* -------- Update Dashboard Job -------- */
export const updateDashboardJob = async (jobId, formDataToSend) => {
  try {
    const { data } = await api.put(
      `${API_ROUTES.JOB.BASE}/${jobId}`,
      formDataToSend,
    );

    console.log("Update Dashboard Job API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Update Dashboard Job Success:", data?.message);
    } else {
      toast.warn(data?.message || "Update dashboard job with warning");
      console.warn(
        "Update Dashboard Job Warning:",
        data?.message || "Update Dashboard Job Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Update Dashboard Job Error:", error);

    throw error;
  }
};

/* -------- Create Company -------- */
export const createCompany = async (formDataToSend) => {
  try {
    const { data } = await api.post(API_ROUTES.COMPANY.BASE, formDataToSend);

    console.log("Create Company API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Create Company Success:", data?.message);
    } else {
      toast.warn(data?.message || "Create company with warning");
      console.warn(
        "Create Company Warning:",
        data?.message || "Create Company Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Create Company Error:", error);

    throw error;
  }
};

/* -------- Delete Company -------- */
export const deleteCompany = async (companyId) => {
  try {
    const { data } = await api.delete(
      `${API_ROUTES.COMPANY.BASE}/${companyId}`,
    );

    console.log("Delete Company API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Delete Company Success:", data?.message);
    } else {
      toast.warn(data?.message || "Delete company with warning");
      console.warn(
        "Delete Company Warning:",
        data?.message || "Delete Company Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Delete Company Error:", error);

    throw error;
  }
};

/* -------- Create Interview -------- */
export const createInterview = async (formDataToSend) => {
  try {
    const { data } = await api.post(API_ROUTES.INTERVIEW.BASE, formDataToSend);

    console.log("Create Interview API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Create Interview Success:", data?.message);
    } else {
      toast.warn(data?.message || "Create interview with warning");
      console.warn(
        "Create Interview Warning:",
        data?.message || "Create Interview Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Create Interview Error:", error);

    throw error;
  }
};
