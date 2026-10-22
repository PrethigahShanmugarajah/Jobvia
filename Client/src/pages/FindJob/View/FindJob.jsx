// Jobvia / Client / src / pages / FindJob / View / FindJob.jsx
import "../Styles/FindJob.css";
import { useAppContext } from "../../../context/appContext";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  applyJobOnceService,
  closeConfirmPopupService,
  confirmApplyService,
  fetchAppliedJobsService,
  fetchJobsService,
  fetchSavedJobsService,
  openConfirmPopupService,
  toggleSaveJobService,
} from "../Services/FindJobServices";
import JobSearch from "../Components/JobSearch";
import JobFilters from "../Components/JobFilters";
import { ThreeCircles } from "react-loader-spinner";
import JobList from "../Components/JobList";
import EmptyJobs from "../Components/EmptyJobs";
import Pagination from "../../../components/Pagination";
import ConfirmPopup from "../../../components/ConfirmPopup";

const FindJob = () => {
  const {
    CURRENCY,
    STORAGE_KEY,
    STORAGE_JOBS_KEY,
    STORAGE_APPLIED_KEY,
    BASE_URL,
  } = useAppContext();

  const [searchTerm, setSearchTerm] = useState({
    company: "",
    location: "",
    role: "",
    experience: "",
  });
  const [filters, setFilters] = useState({
    jobType: [],
    minSalary: "",
    maxSalary: "",
    category: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage, setJobsPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [, setShowFilters] = useState(false);

  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_JOBS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedJobs, setAppliedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_APPLIED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (jobId) => {
    setImgErrors((prev) => ({ ...prev, [jobId]: true }));
  };

  const filtersRef = useRef(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  const handleSearchChange = (field, value) => {
    setSearchTerm((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      if (type === "jobType" || type === "category") {
        const array = prev[type];
        if (array.includes(value)) {
          return { ...prev, [type]: array.filter((item) => item !== value) };
        } else {
          return { ...prev, [type]: [...array, value] };
        }
      }
      return { ...prev, [type]: value };
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({ jobType: [], minSalary: "", maxSalary: "", category: [] });
    setSearchTerm({ company: "", location: "", role: "", experience: "" });
    setCurrentPage(1);
  };

  const loadToggleSaveJob = (jobId) =>
    toggleSaveJobService(jobId, STORAGE_KEY, STORAGE_JOBS_KEY, setSavedJobs);

  const applyJobOnce = (jobId) =>
    applyJobOnceService(jobId, STORAGE_APPLIED_KEY, setAppliedJobs);

  const openConfirmPopup = (job) =>
    openConfirmPopupService(job, appliedJobs, STORAGE_KEY, setSelectedJob);

  const confirmApply = () =>
    confirmApplyService(
      selectedJob,
      isApplying,
      STORAGE_KEY,
      setIsApplying,
      setSelectedJob,
      applyJobOnce,
    );

  useEffect(() => {
    const loadAppliedJobs = () =>
      fetchAppliedJobsService(STORAGE_KEY, STORAGE_APPLIED_KEY, setAppliedJobs);

    const loadSavedJobs = () =>
      fetchSavedJobsService(STORAGE_KEY, STORAGE_JOBS_KEY, setSavedJobs);

    const handler = (e) => {
      if (e.key === STORAGE_JOBS_KEY) {
        try {
          setSavedJobs(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setSavedJobs([]);
        }
      } else if (e.key === STORAGE_APPLIED_KEY) {
        try {
          setAppliedJobs(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setAppliedJobs([]);
        }
      }
    };
    window.addEventListener("storage", handler);
    loadAppliedJobs();
    loadSavedJobs();
    return () => window.removeEventListener("storage", handler);
  }, [STORAGE_KEY, STORAGE_APPLIED_KEY, STORAGE_JOBS_KEY]);

  const sortedJobs = useMemo(
    () =>
      [...jobs].sort(
        (a, b) => new Date(b.datePosted || 0) - new Date(a.datePosted || 0),
      ),
    [jobs],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobsService(
        searchTerm,
        filters,
        BASE_URL,
        setLoading,
        setJobs,
        setFilteredJobs,
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filters, BASE_URL]);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const displayedJobs = sortedJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

  const activeFilterCount =
    filters.jobType.length +
    filters.category.length +
    (filters.minSalary ? 1 : 0) +
    (filters.maxSalary ? 1 : 0);

  const isSearchActive =
    searchTerm.company ||
    searchTerm.location ||
    searchTerm.role ||
    searchTerm.experience;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100/50 font-mono overflow-x-hidden">
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="container mx-auto px-4 pt-8 pb-12 relative">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-5xl font-[pacifico] font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Find Your Dream Job
              </h1>
            </div>
          </div>

          <JobSearch
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            isSearchActive={isSearchActive}
            activeFilterCount={activeFilterCount}
            clearFilters={clearFilters}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 pt-6">
        <div className="flex flex-col md:flex lg:flex-row gap-8">
          {/* -------- Filters Sidebar -------- */}
          <JobFilters
            CURRENCY={CURRENCY}
            filtersRef={filtersRef}
            filters={filters}
            jobs={jobs}
            activeFilterCount={activeFilterCount}
            clearFilters={clearFilters}
            setShowFilters={setShowFilters}
            handleFilterChange={handleFilterChange}
          />

          {/* -------- Job Cards -------- */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
                <ThreeCircles
                  visible={true}
                  height="80"
                  width="80"
                  color="#4F46E5"
                  ariaLabel="three-circles-loading"
                />
              </div>
            ) : (
              <JobList
                displayedJobs={displayedJobs}
                imgErrors={imgErrors}
                BASE_URL={BASE_URL}
                handleImgError={handleImgError}
                appliedJobs={appliedJobs}
                savedJobs={savedJobs}
                openConfirmPopup={openConfirmPopup}
                loadToggleSaveJob={loadToggleSaveJob}
              />
            )}

            {!loading && filteredJobs.length === 0 && (
              <EmptyJobs clearFilters={clearFilters} />
            )}

            {filteredJobs.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={jobsPerPage}
                onItemsPerPageChange={(count) => {
                  setJobsPerPage(count);
                  setCurrentPage(1);
                }}
                itemsPerPageOptions={[6, 12, 18, 24]}
                showItemsPerPage={true}
              />
            )}
          </div>
        </div>
      </div>

      {/* -------- Confirmation Popup -------- */}
      {selectedJob && (
        <ConfirmPopup
          title="Confirm Application"
          description={
            <>
              Are you sure you want to apply for{" "}
              <strong>{selectedJob.role}</strong> at{" "}
              <strong>{selectedJob.company}</strong>?
            </>
          }
          confirmText="Confirm"
          closeText="Cancel"
          loading={isApplying}
          onConfirm={confirmApply}
          onClose={() => closeConfirmPopupService(isApplying, setSelectedJob)}
        />
      )}
    </div>
  );
};

export default FindJob;
