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
  },
};

export default API_ROUTES;
