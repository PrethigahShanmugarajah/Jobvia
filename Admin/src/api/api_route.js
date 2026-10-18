// Jobvia / Admin / src / api / api_route.js

const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
  },

  JOB: {
    BASE: "/api/job",
    ADMIN_STATS: "/api/job/admin/stats",
    ADMIN_JOBS: "/api/job/admin/jobs",
    CLOSE: (jobId) => `/api/job/${jobId}/close`,
  },

  COMPANY: {
    BASE: "/api/company",
  },

  INTERVIEW: {
    BASE: "/api/interview",
    COMPANIES: "/api/interview/companies",
    ROLE: "/api/interview/role",
    ROLES: "/api/interview/roles",
  },
};

export default API_ROUTES;
