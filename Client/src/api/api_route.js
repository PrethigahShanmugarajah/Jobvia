// Jobvia / Client / src / api / api_route.js

const API_ROUTES = {
  COMPANY: {
    BASE: "company",
  },

  INTERVIEW: {
    COMPANIES: "interview/companies",
    ROLES: "interview/roles",
    COMPANY: (companyId) => `interview/company/${companyId}`,
    ROLE: (roleId) => `interview/role/${roleId}`,
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
    QUESTION: (id, type = "interview") => `saved/question/${id}?type=${type}`,
    ROLE_QUESTION: (id) => `saved/question/${id}?type=role`,
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
