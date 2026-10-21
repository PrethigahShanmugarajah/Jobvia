// Jobvia / Client / src / pages / SignIn / Services / SignInServices.jsx;
import {
  forgotPassword,
  loginUser,
  resetPassword,
} from "../../../services/mutations";

/* -------- Handle login -------- */
export const submitLoginService = async (
  e,
  email,
  password,
  setEmail,
  setPassword,
  setIsLoading,
  STORAGE_KEY,
  navigate,
) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    const data = await loginUser(email, password);

    if (data?.success) {
      const userData = {
        name: data.user.name,
        email: data.user.email,
        token: data.token,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 700);
    }
  } finally {
    setIsLoading(false);
  }
};

/* -------- Handle forgot password -------- */
export const submitForgotPasswordService = async (
  e,
  resetEmail,
  setIsLoading,
  setView,
) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    const data = await forgotPassword(resetEmail);

    if (data?.success) {
      setView("reset");
    }
  } finally {
    setIsLoading(false);
  }
};

/* -------- Handle reset password -------- */
export const submitResetPasswordService = async (
  e,
  resetEmail,
  otp,
  newPassword,
  setIsLoading,
  setView,
  setResetEmail,
  setOtp,
  setNewPassword,
) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    const data = await resetPassword(resetEmail, otp, newPassword);

    if (data?.success) {
      setView("login");
      setResetEmail("");
      setOtp("");
      setNewPassword("");
    }
  } finally {
    setIsLoading(false);
  }
};
