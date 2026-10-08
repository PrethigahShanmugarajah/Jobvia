// Jobvia / Server / utils / passwordValidator.js

/* -------- Validate Password -------- */
export const validatePassword = (password) => {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  if (password.length > 12) {
    return "Password must not exceed 12 characters.";
  }

  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter (A-Z).";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter (a-z).";
  }

  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number (0-9).";
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must contain at least one special character.";
  }

  return null;
};
