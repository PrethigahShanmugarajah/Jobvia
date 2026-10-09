// Jobvia / Server / config / env.js
export const port = process.env.PORT;

export const mongodbUri = process.env.MONGODB_URI;

export const projectName = process.env.PROJECT_NAME;

export const otpTtlMinutes = Number(process.env.OTP_TTL_MINUTES);

export const brevoApiKey = process.env.BREVO_API_KEY;

export const senderEmail = process.env.SENDER_EMAIL;

export const jwtSecret = process.env.JWT_SECRET;

export const jwtSecretExpiresIn = process.env.JWT_SECRET_EXPIRES_IN;

export const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;

export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;

export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

export const clientUrl = process.env.CLINT_URL;

export const adminUrl = process.env.ADMIN_URL;
