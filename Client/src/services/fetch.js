// Jobvia / Client / src / services / fetch.js
import api from "../api/axios";
import API_ROUTES from "../api/api_route";
import { toast } from "react-toastify";

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
      console.warn("Fetch Interview Companies Warning:", data?.message);
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

    console.log("Fetch Interview Roles API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Interview Roles Success:", data?.message);
    } else {
      toast.warn(data?.message || "Fetch interview roles with warning");
      console.warn("Fetch Interview Roles Warning:", data?.message);
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Interview Roles Error:", error);

    throw error;
  }
};

/* -------- Fetch User Profile -------- */
export const fetchUserProfile = async () => {
  try {
    const { data } = await api.get(API_ROUTES.USER.BASE);

    console.log("Fetch User Profile API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch User Profile Success:", data?.message);
    } else {
      toast.warn(data?.message || "Failed to fetch user profile.");
      console.warn("Fetch User Profile Warning:", data?.message);
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch User Profile Error:", error);

    throw error;
  }
};

/* -------- Fetch Applied Jobs -------- */
export const fetchAppliedJobs = async () => {
  try {
    const { data } = await api.get(API_ROUTES.APPLICATION.USER);

    console.log("Fetch Applied Jobs API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Applied Jobs Success:", data?.message);
    } else {
      toast.warn(data?.message || "Failed to fetch applied jobs.");
      console.warn("Fetch Applied Jobs Warning:", data?.message);
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Applied Jobs Error:", error);

    throw error;
  }
};

/* -------- Fetch Saved Jobs -------- */
export const fetchSavedJobs = async () => {
  try {
    const { data } = await api.get(API_ROUTES.SAVED.BASE);

    console.log("Fetch Saved Jobs API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Saved Jobs Success:", data?.message);
    } else {
      toast.warn(data?.message || "Failed to fetch saved jobs.");
      console.warn("Fetch Saved Jobs Warning:", data?.message);
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Saved Jobs Error:", error);

    throw error;
  }
};

/* -------- Fetch Jobs -------- */
export const fetchJobs = async (params) => {
  try {
    const { data } = await api.get(
      `${API_ROUTES.JOB.BASE}?${params.toString()}`,
    );

    console.log("Fetch Jobs API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Jobs Success:", data?.message);
    } else {
      toast.warn(data?.message || "Failed to fetch jobs.");
      console.warn("Fetch Jobs Warning:", data?.message);
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Jobs Error:", error);

    throw error;
  }
};
