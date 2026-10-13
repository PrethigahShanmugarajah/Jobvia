// Jobvia / Admin / src / pages / Dashboard / Services / DashboardServices.jsx
import {
  fetchDashboardJobs,
  fetchDashboardStats,
} from "../../../services/fetch";
import { closeDashboardJob } from "../../../services/mutations";

/* -------- Map dashboard jobs -------- */
const mapDashboardJobs = (jobs, BASE_URL) =>
  jobs.map((j) => ({
    id: j._id,
    name: j.companyName,
    role: j.roleName,
    location: j.location,
    category: j.category,
    logo: j.companyLogo?.startsWith("http")
      ? j.companyLogo
      : `${BASE_URL}${j.companyLogo || ""}`,
    applicants: j.applicantsCount || 0,
    status: j.status || "active",
  }));

/* -------- Fetch dashboard data -------- */
export const fetchDashboardDataService = async (
  setLoading,
  setDashboardStats,
  setJobs,
  navigate,
  BASE_URL,
) => {
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const statsData = await fetchDashboardStats();
    setDashboardStats(statsData.stats);

    const jobsData = await fetchDashboardJobs();
    setJobs(mapDashboardJobs(jobsData.jobs, BASE_URL));
  } catch (error) {
    console.error("Error Fetching Dashboard Data:", error);
  } finally {
    setLoading(false);
  }
};

/* -------- Close job -------- */
export const closeDashboardJobService = async (
  jobId,
  setDashboardStats,
  setJobs,
  BASE_URL,
) => {
  try {
    const data = await closeDashboardJob(jobId);

    if (!data.success) {
      return false;
    }

    const statsData = await fetchDashboardStats();
    setDashboardStats(statsData.stats);

    const jobsData = await fetchDashboardJobs();
    setJobs(mapDashboardJobs(jobsData.jobs, BASE_URL));
  } catch {
    return false;
  }
};

/* -------- Clear dashboard filters -------- */
export const clearDashboardFilters = (
  setCompanyFilter,
  setRoleFilter,
  setStatusFilter,
) => {
  setCompanyFilter("");
  setRoleFilter("");
  setStatusFilter("active");
};
