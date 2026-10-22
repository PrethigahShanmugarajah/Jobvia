// Jobvia / Client / src / pages / JobDetails / View / JobDetails.jsx
import "../Styles/JobDetails.css";
import { useAppContext } from "../../../context/appContext";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  applyJobOnceService,
  closeConfirmPopupService,
  confirmApplyService,
  fetchAppliedJobsService,
  fetchJobDetailsService,
  openConfirmPopupService,
  toggleSaveJobService,
} from "../Services/JobDetailsServices";
import { ThreeCircles } from "react-loader-spinner";
import JobNotFound from "../Components/JobNotFound";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import JobDetailsHeader from "../Components/JobDetailsHeader";
import JobInfoList from "../Components/JobInfoList";
import { getCategoryColor } from "../../../constants/categoryColors";
import JobRequirements from "../Components/JobRequirements";
import { formatRelativeDate } from "../../../utils/date";
import ConfirmPopup from "../../../components/ConfirmPopup";

const JobDetails = () => {
  const { CURRENCY, STORAGE_KEY, STORAGE_JOBS_KEY, BASE_URL } = useAppContext();

  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_JOBS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetchJobDetailsService(id, BASE_URL, setJob, setLoading);
  }, [BASE_URL, id]);

  const toggleSaveJob = () => {
    toggleSaveJobService(job, STORAGE_JOBS_KEY, setSavedJobs);
  };

  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    fetchAppliedJobsService(STORAGE_KEY, "appliedJobs", setAppliedJobs);
  }, [STORAGE_KEY]);

  const [popupConfirm, setPopupConfirm] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const applyJobOnce = (jobId) => {
    applyJobOnceService(jobId, "appliedJobs", setAppliedJobs);
  };

  const confirmApply = () => {
    confirmApplyService(
      job,
      isApplying,
      STORAGE_KEY,
      setIsApplying,
      setPopupConfirm,
      applyJobOnce,
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50">
        <ThreeCircles
          visible={true}
          height="80"
          width="80"
          color="#4F46E5"
          ariaLabel="three-circles-loading"
        />
      </div>
    );
  }

  if (!job) {
    return <JobNotFound />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 py-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 font-mono overflow-x-hidden">
      <div className="mx-auto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-4 sm:mb-6 transition-all duration-300 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm sm:text-base">Back to Search</span>
        </Link>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/20 animate-fade-in-up">
          <JobDetailsHeader
            job={job}
            BASE_URL={BASE_URL}
            toggleSaveJob={toggleSaveJob}
            savedJobs={savedJobs}
          />

          <JobInfoList job={job} CURRENCY={CURRENCY} />

          <div className="job-category-section mb-6 animate-fade-in">
            <h2 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
              Category
            </h2>

            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-bold border hover:scale-105 transition-transform duration-200 ${getCategoryColor(job.category)}`}
            >
              {job.category}
            </span>
          </div>

          {job.overview && (
            <div className="job-overview-section mb-6 animate-fade-in">
              <h2 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Overview
              </h2>

              <p className="text-gray-600 leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100 wrap-break-word">
                {job.overview}
              </p>
            </div>
          )}

          <JobRequirements
            title="Responsibilities"
            items={job.responsibilities}
            sectionClass="job-responsibilities-section"
          />

          <JobRequirements
            title="Job Criteria"
            items={job.jobCriteria}
            sectionClass="job-criteria-section"
          />

          <JobRequirements
            title="Education"
            items={job.education}
            sectionClass="job-education-section"
          />

          {job.techStack && job.techStack.length > 0 && (
            <div className="job-tech-stack-section mb-6 animate-fade-in">
              <h2 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                Tech Stack
              </h2>

              <div className="flex flex-wrap gap-2">
                {job.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-200 hover:scale-105 transition-all duration-200 wrap-break-word"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="job-actions-section flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200/50 animate-fade-in">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                Posted {formatRelativeDate(job.datePosted)}
              </span>
            </div>

            <button
              onClick={() =>
                openConfirmPopupService(
                  job,
                  appliedJobs,
                  STORAGE_KEY,
                  setPopupConfirm,
                )
              }
              disabled={appliedJobs.includes(String(job.id))}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:scale-95 flex items-center gap-2 ${
                appliedJobs.includes(String(job.id))
                  ? "bg-gray-300 text-gray-800 cursor-not-allowed"
                  : "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:scale-105"
              }`}
            >
              {appliedJobs.includes(String(job.id)) ? "Applied" : "Apply Now"}

              {!appliedJobs.includes(String(job.id)) && (
                <ExternalLink className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {popupConfirm && (
        <ConfirmPopup
          onClose={() => closeConfirmPopupService(isApplying, setPopupConfirm)}
          onConfirm={confirmApply}
          loading={isApplying}
          item={`${job.role} at ${job.company}`}
          title="Confirm Application"
          description={
            <>
              Are you sure you want to apply for <strong>{job.role}</strong> at{" "}
              <strong>{job.company}</strong>?
            </>
          }
          confirmText="Confirm"
          closeText="Cancel"
          confirmColor="blue"
          maxWidth="max-w-sm"
        />
      )}
    </div>
  );
};

export default JobDetails;
