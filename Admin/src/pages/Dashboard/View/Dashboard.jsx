import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/appContext";
import {
  clearDashboardFilters,
  closeDashboardJobService,
  fetchDashboardDataService,
} from "../Services/DashboardServices";
import PageHeader from "../../../components/PageHeader";
import { TrendingUp } from "lucide-react";
import DashboardStats from "../Components/DashboardStats";
import DashboardFilters from "../Components/DashboardFilters";
import DashboardJobList from "../Components/DashboardJobList";
import ConfirmPopup from "../../../components/ConfirmPopup";

const Dashboard = () => {
  const [companyFilter, setCompanyFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalJobs: "0",
    closedJobs: "0",
    totalApplicants: "0",
    totalCompanies: "0",
  });
  const [jobs, setJobs] = useState([]);
  const [showCloseJobPopup, setShowCloseJobPopup] = useState(false);
  const [closingJobId, setClosingJobId] = useState(null);
  const [closingJob, setClosingJob] = useState(null);
  const [closingJobLoading, setClosingJobLoading] = useState(false);

  const { navigate, BASE_URL } = useAppContext();

  useEffect(() => {
    fetchDashboardDataService(
      setLoading,
      setDashboardStats,
      setJobs,
      navigate,
      BASE_URL,
    );
  }, [BASE_URL, navigate]);

  const confirmCloseJob = (job) => {
    setClosingJobId(job.id);
    setClosingJob(job);
    setShowCloseJobPopup(true);
  };

  const handleConfirmCloseJob = async () => {
    setClosingJobLoading(true);

    try {
      await closeDashboardJobService(
        closingJobId,
        setDashboardStats,
        setJobs,
        BASE_URL,
      );

      setShowCloseJobPopup(false);
      setClosingJobId(null);
    } finally {
      setClosingJobLoading(false);
    }
  };

  const uniqueCompanies = [...new Set(jobs.map((c) => c.name))];
  const uniqueRoles = [...new Set(jobs.map((c) => c.role))];

  /* -------- Filter jobs based on selected filters -------- */
  const filteredJobs = jobs.filter((job) => {
    const matchesCompany = companyFilter === "" || job.name === companyFilter;
    const matchesRole = roleFilter === "" || job.role === roleFilter;
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesCompany && matchesRole && matchesStatus;
  });

  const handleImageError = (e) => {
    e.target.display = "none";
    e.target.nextSibling?.classList.remove("hidden");
  };

  const clearFilters = () => {
    clearDashboardFilters(setCompanyFilter, setRoleFilter, setStatusFilter);
  };

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-slate-50 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <PageHeader
          title="Jobvia Dashboard"
          description="Real-time overview of jobs and applicants"
          Icon={TrendingUp}
        />

        {/* -------- Stats Card -------- */}
        <DashboardStats dashboardStats={dashboardStats} loading={loading} />

        {/* -------- Filter Section -------- */}
        <DashboardFilters
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          uniqueCompanies={uniqueCompanies}
          uniqueRoles={uniqueRoles}
          clearFilters={clearFilters}
        />

        {/* -------- Companies Section -------- */}
        <DashboardJobList
          loading={loading}
          filteredJobs={filteredJobs}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          navigate={navigate}
          confirmCloseJob={confirmCloseJob}
          handleImageError={handleImageError}
          clearFilters={clearFilters}
        />
      </div>

      {showCloseJobPopup && (
        <ConfirmPopup
          title="Close Job"
          description={
            <>
              Are you sure you want to close <strong>{closingJob?.role}</strong>{" "}
              at <strong>{closingJob?.name}</strong>? This action cannot be
              undone.
            </>
          }
          confirmText="Close Job"
          closeText="Cancel"
          loading={closingJobLoading}
          onClose={() => setShowCloseJobPopup(false)}
          onConfirm={handleConfirmCloseJob}
        />
      )}
    </div>
  );
};

export default Dashboard;
