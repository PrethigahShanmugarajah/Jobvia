// Jobvia / Admin / src / api / api_route.js

const API_ROUTES = {
  AUTH: {
    LOGIN: "/api/auth/login",
  },

  JOB: {
    ADMIN_STATS: "/api/job/admin/stats",
    ADMIN_JOBS: "/api/job/admin/jobs",
    CLOSE: (jobId) => `/api/job/${jobId}/close`,
  },
};

export default API_ROUTES;
