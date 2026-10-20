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
