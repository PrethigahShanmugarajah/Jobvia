// Jobvia / Client / src / pages / SignUp / Services / SignUpServices.jsx
import { registerUser, verifyEmail } from "../../../services/mutations";

/* -------- Handle signup -------- */
export const submitSignUpService = async (
  e,
  formData,
  validateForm,
  setIsLoading,
  setIsVerifying,
) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {
    setIsLoading(true);

    const data = await registerUser(formData);

    if (data?.success) {
      setIsVerifying(true);
    }
  } finally {
    setIsLoading(false);
  }
};

/* -------- Handle email verification -------- */
export const submitVerifyEmailService = async (
  e,
  email,
  otp,
  setIsLoading,
  navigate,
) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    const data = await verifyEmail(email, otp);

    if (data?.success) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }

    return data?.success;
  } finally {
    setIsLoading(false);
  }
};
