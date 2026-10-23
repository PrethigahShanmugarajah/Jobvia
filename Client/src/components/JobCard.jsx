// Jobvia / Client / src / components / JobCard.jsx
import CompanyLogo from "./CompanyLogo";
import {
  Bookmark,
  Briefcase,
  Calendar,
  ExternalLink,
  Eye,
  MapPin,
  Users,
} from "lucide-react";
import { getExperienceColor } from "../constants/getExperienceColor";
import { formatSalary } from "../utils/salary";
import { getJobTypeColor } from "../constants/getJobTypeColor";
import { normalizeJobTypeForDisplay } from "../utils/jobFormatters";
import { formatRelativeDate } from "../utils/date";
import { getCategoryColor } from "../constants/categoryColors";
import { Link } from "react-router-dom";

const JobCard = ({
  job,
  variant = "find",
  item,
  idx = 0,
  imgErrors = {},
  BASE_URL,
  handleImgError,
  appliedJobs = [],
  savedJobs = [],
  currency,
  onApply,
  onToggleSave,
  onToggleSaveService,
  fetchSavedItems,
}) => {
  const isSaved = variant === "saved" || savedJobs.includes(String(job.id));

  const isApplied = appliedJobs.includes(String(job.id));

  const isFind = variant === "find";

  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 overflow-hidden flex flex-col h-full p-4 ${
        isFind
          ? "rounded-3xl border-2 hover:-translate-y-2"
          : `hover:-translate-y-1 animate-fadeIn animate-delay-${Math.min(idx, 9)}`
      }`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 ${
            isFind
              ? "rounded-2xl shadow-lg"
              : job.logo
                ? ""
                : "flex items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg"
          }`}
        >
          {isFind ? (
            <CompanyLogo
              job={job}
              imgErrors={imgErrors}
              BASE_URL={BASE_URL}
              handleImgError={handleImgError}
            />
          ) : job.logo ? (
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-full h-full object-contain"
            />
          ) : (
            <span className="text-xl font-bold">
              {job.company?.charAt(0) || "?"}
            </span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="text-md sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors wrap-break-word">
            {job.role}
          </h3>

          <p className="text-gray-600 font-medium truncate mt-1">
            {job.company}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(job.techStack || []).slice(0, 6).map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors border border-gray-200"
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 ${
          isFind ? "lg:grid-cols-2 xl:grid-cols-2 gap-4" : ""
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>

          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              isFind
                ? "line-clamp-3 bg-blue-100 text-blue-700 border-blue-200"
                : "bg-blue-100 text-blue-700 border-blue-200"
            }`}
          >
            {job.location}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-50">
            <Users className="w-4 h-4 text-purple-600" />
          </div>

          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              isFind
                ? `line-clamp-3 ${getExperienceColor(job.experienceLevel)}`
                : "bg-green-100 text-green-700 border-green-200"
            }`}
          >
            {job.experience}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-50">
            <span className="text-sm font-bold text-green-600">{currency}</span>
          </div>

          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              isFind
                ? "line-clamp-3 bg-linear-to-r from-green-100 to-emerald-100 text-green-700 border-green-200"
                : "bg-green-100 text-green-700 border-green-200"
            }`}
          >
            {formatSalary(job.salary, job.salaryType, currency)}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-50">
            <Briefcase className="w-4 h-4 text-orange-600" />
          </div>

          <span
            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
              isFind
                ? `line-clamp-3 ${getJobTypeColor(job.jobType)}`
                : "bg-orange-100 text-orange-700 border-orange-200"
            }`}
          >
            {isFind ? normalizeJobTypeForDisplay(job.jobType) : job.jobType}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 mt-auto">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />

          <span className="text-sm text-gray-500">
            {job.datePosted ? formatRelativeDate(job.datePosted) : ""}
          </span>
        </div>

        <span
          className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
            isFind
              ? getCategoryColor(job.category)
              : "bg-gray-100 text-gray-700 border-gray-200"
          }`}
        >
          {job.category}
        </span>
      </div>

      <div
        className={`flex items-center gap-3 mt-2 ${
          isFind ? "justify-between" : "flex-row"
        }`}
      >
        <button
          type="button"
          className={`flex ${
            isFind ? "" : "w-full sm:w-auto"
          } justify-center items-center gap-2 px-4 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md active:scale-95 ${
            isApplied
              ? "bg-gray-300 text-gray-800"
              : "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
          }`}
          onClick={() => {
            if (!isApplied) onApply?.(job);
          }}
          aria-pressed={isApplied}
        >
          {isApplied ? "Applied" : "Apply Now"}
          <ExternalLink className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <Link
            to={`/job-details/${job.id}`}
            aria-label="View job details"
            className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 inline-flex items-center justify-center"
          >
            <Eye className="w-5 h-5" />
          </Link>

          <button
            type="button"
            onClick={() => {
              if (isFind) {
                onToggleSave?.(job.id);
              } else {
                onToggleSaveService?.(item.id, fetchSavedItems);
              }
            }}
            aria-label={isSaved ? "Unsave job" : "Save job"}
            className={`p-2.5 rounded-full cursor-pointer transition-all duration-200 inline-flex items-center justify-center ${
              isSaved
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
