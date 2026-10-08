// Jobvia / Server / config / env.js
export const port = process.env.PORT;

export const mongodbUri = process.env.MONGODB_URI;

export const projectName = process.env.PROJECT_NAME;

export const otpTtlMinutes = Number(process.env.OTP_TTL_MINUTES);

export const brevoApiKey = process.env.BREVO_API_KEY;

export const senderEmail = process.env.SENDER_EMAIL;

export const jwtSecret = process.env.JWT_SECRET;

export const jwtSecretExpiresIn = process.env.JWT_SECRET_EXPIRES_IN;
