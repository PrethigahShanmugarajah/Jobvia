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

  APPLICATION: {
    APPLICATIONS: (jobId) => `/api/application/${jobId}/applications`,
  },

  USER: {
    RESUME: (userId) => `/api/user/resume/${userId}`,
  },
};

export default API_ROUTES;
