// Jobvia / Server / utils / otp.js

/* -------- Generate OTP -------- */
export const generateOTP = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  return Array.from(
    { length: 6 },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join("");
};

/* -------- Get OTP Expiration -------- */
export const getOTPExpiration = (otpTtlMinutes) => {
  return Date.now() + otpTtlMinutes * 60 * 1000;
};
