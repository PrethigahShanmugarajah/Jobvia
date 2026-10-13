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
