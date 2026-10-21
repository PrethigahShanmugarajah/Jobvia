// Jobvia / Client / src / services / mutations.js
import api from "../api/axios";
import API_ROUTES from "../api/api_route";
import { toast } from "react-toastify";

/* -------- Login User -------- */
export const loginUser = async (email, password) => {
  try {
    const { data } = await api.post(API_ROUTES.AUTH.LOGIN, {
      email,
      password,
    });

    console.log("Login User API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Login Success:", data?.message);
    } else {
      toast.warn(data?.message || "Login User failed with warning");
      console.warn(
        "Login User Warning:",
        data?.message || "Login User failed with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Login User Error:", error);

    throw error;
  }
};

/* -------- Forgot Password -------- */
export const forgotPassword = async (email) => {
  try {
    const { data } = await api.post(API_ROUTES.AUTH.FORGOT_PASSWORD, {
      email,
    });

    console.log("Forgot Password API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Forgot Password Success:", data?.message);
    } else {
      toast.warn(data?.message || "Forgot Password failed with warning");
      console.warn(
        "Forgot Password Warning:",
        data?.message || "Forgot Password failed with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Forgot Password Error:", error);

    throw error;
  }
};

/* -------- Reset Password -------- */
export const resetPassword = async (email, otp, newPassword) => {
  try {
    const { data } = await api.post(API_ROUTES.AUTH.RESET_PASSWORD, {
      email,
      otp,
      newPassword,
    });

    console.log("Reset Password API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Reset Password Success:", data?.message);
    } else {
      toast.warn(data?.message || "Reset Password failed with warning");
      console.warn(
        "Reset Password Warning:",
        data?.message || "Reset Password failed with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Reset Password Error:", error);

    throw error;
  }
};

/* -------- Register User -------- */
export const registerUser = async (formData) => {
  try {
    const { data } = await api.post(API_ROUTES.AUTH.REGISTER, formData);

    console.log("Register User API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Register User Success:", data?.message);
    } else {
      toast.warn(data?.message || "Register User failed with warning");
      console.warn(
        "Register User Warning:",
        data?.message || "Register User failed with warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Register User Error:", error);

    throw error;
  }
};

/* -------- Verify Email -------- */
export const verifyEmail = async (email, otp) => {
  try {
    const { data } = await api.post(API_ROUTES.AUTH.VERIFY_EMAIL, {
      email,
      otp,
    });

    console.log("Verify Email API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Verify Email Success:", data?.message);
    } else {
      toast.warn(data?.message || "Email verification failed");
      console.warn(
        "Verify Email Warning:",
        data?.message || "Email verification failed",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Verify Email Error:", error);

    throw error;
  }
};
