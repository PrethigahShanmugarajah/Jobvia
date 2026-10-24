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

    if (!data?.success) {
      toast.warn(data?.message || "Admin login failed.");
      console.warn("Admin Login Warning:", data?.message);
      return data;
    }

    if (data?.user?.role !== "admin") {
      toast.error("Access denied. Admins only.");
      return null;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.dispatchEvent(new Event("userUpdated"));

    toast.success(data?.message);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Admin Login Error:", error);

    throw error;
  }
};

/* -------- Close Dashboard Job -------- */
export const closeDashboardJob = async (jobId) => {
  try {
    const { data } = await api.patch(API_ROUTES.JOB.CLOSE(jobId));

    if (data?.success) {
      toast.success(data?.message);
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

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast.warn(data?.message || "Create job with warning");
      console.warn(
        "Create Job Warning:",
        data?.message || "Create Job Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Create Job Error:", error);

    throw error;
  }
};

/* -------- Delete Dashboard Job -------- */
export const deleteDashboardJob = async (jobId) => {
  try {
    const { data } = await api.delete(`${API_ROUTES.JOB.BASE}/${jobId}`);

    if (data?.success) {
      toast.success(data?.message);
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

    if (data?.success) {
      toast.success(data?.message);
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

    if (data?.success) {
      toast.success(data?.message);
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

    if (data?.success) {
      toast.success(data?.message);
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

    if (data?.success) {
      toast.success(data?.message);
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

/* -------- Delete Interview Company -------- */
export const deleteInterviewCompany = async (companyId) => {
  try {
    const { data } = await api.delete(
      `${API_ROUTES.INTERVIEW.BASE}/${companyId}`,
    );

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast.warn(data?.message || "Delete interview company with warning");
      console.warn(
        "Delete Interview Company Warning:",
        data?.message || "Delete Interview Company Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Delete Interview Company Error:", error);

    throw error;
  }
};

/* -------- Update Interview Company -------- */
export const updateInterviewCompany = async (companyId, formDataToSend) => {
  try {
    const { data } = await api.put(
      `${API_ROUTES.INTERVIEW.BASE}/${companyId}`,
      formDataToSend,
    );

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast.warn(data?.message || "Update interview company with warning");
      console.warn(
        "Update Interview Company Warning:",
        data?.message || "Update Interview Company Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Update Interview Company Error:", error);

    throw error;
  }
};

/* -------- Add Role Question -------- */
export const addRoleQuestion = async (formDataToSend) => {
  try {
    const { data } = await api.post(API_ROUTES.INTERVIEW.ROLE, formDataToSend);

    if (data?.success) {
      toast.success(data?.message || "Role questions added successfully.");
    } else {
      toast.warn(data?.message || "Failed to add role questions.");
      console.warn(
        "Add Role Question Warning:",
        data?.message || "Failed to add role questions.",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Add Role Question Error:", error);

    throw error;
  }
};

/* -------- Update Interview Role Question -------- */
export const updateRoleQuestion = async (roleId, formDataToSend) => {
  try {
    const { data } = await api.put(
      `${API_ROUTES.INTERVIEW.ROLE}/${roleId}`,
      formDataToSend,
    );

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast.warn(data?.message || "Failed to update role questions.");
      console.warn(
        "Update Role Question Warning:",
        data?.message || "Failed to update role questions.",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Update Role Question Error:", error);

    throw error;
  }
};

/* -------- Delete Interview Role Question -------- */
export const deleteRoleQuestion = async (roleId) => {
  try {
    const { data } = await api.delete(`${API_ROUTES.INTERVIEW.ROLE}/${roleId}`);

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast.warn(data?.message || "Failed to delete role.");
      console.warn(
        "Delete Role Question Warning:",
        data?.message || "Failed to delete role.",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Delete Role Question Error:", error);

    throw error;
  }
};
