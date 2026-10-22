// Jobvia / Client / src / api / api_route.js

const API_ROUTES = {
  COMPANY: {
    BASE: "company",
  },

  INTERVIEW: {
    COMPANIES: "interview/companies",
    ROLES: "interview/roles",
  },

  AUTH: {
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    REGISTER: "/auth/register",
    VERIFY_EMAIL: "/auth/verify-email",
  },

  SAVED: {
    BASE: "saved",
    JOB: (jobId) => `saved/job/${jobId}`,
  },

  USER: {
    BASE: "user",
    RESUME: (userId) => `user/resume/${userId}`,
  },

  APPLICATION: {
    APPLY: (jobId) => `application/apply/${jobId}`,
    USER: "application/user",
  },

  JOB: {
    BASE: "job",
  },
};

export default API_ROUTES;
