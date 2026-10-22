// Jobvia / Client / src / pages / FindJob / Components / JobList.jsx
import "../Styles/FindJob.css";
import CompanyLogo from "./CompanyLogo";
import {
  MapPin,
  Briefcase,
  Calendar,
  ExternalLink,
  Users,
  Bookmark,
  Eye,
  DollarSign,
} from "lucide-react";
import { getExperienceColor } from "../Constants/getExperienceColor";
import {
  formatDate,
  formatSalary,
  normalizeJobTypeForDisplay,
} from "../Utils/jobFormatters";
import { getJobTypeColor } from "../Constants/getJobTypeColor";
import { getCategoryColor } from "../Constants/categoryColors";
import { Link } from "react-router-dom";

const JobList = ({
  displayedJobs,
  imgErrors,
  BASE_URL,
  handleImgError,
  appliedJobs,
  savedJobs,
  openConfirmPopup,
  loadToggleSaveJob,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {displayedJobs.map((job) => (
        <div
          key={job.id}
          className="group relative bg-white rounded-3xl shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-blue-300 transition-all duration-500 overflow-hidden transform hover:-translate-y-2 flex flex-col h-full"
        >
          <div className="p-2 flex-1 flex flex-col">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 shrink-0 shadow-lg rounded-2xl">
                <CompanyLogo
                  job={job}
                  imgErrors={imgErrors}
                  BASE_URL={BASE_URL}
                  handleImgError={handleImgError}
                />
              </div>

              <div className="min-w-0">
                <h3 className="text-md font-bold text-gray-800 group-hover:text-blue-600 transition-colors wrap-break-word">
                  {job.role}
                </h3>

                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-600 font-medium truncate">
                    {job.company}
                  </p>
                </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>

                <div>
                  <span className="px-3 py-1.5 rounded-full line-clamp-3 text-xs font-bold border bg-blue-100 text-blue-700 border-blue-200">
                    {job.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>

                <div>
                  <span
                    className={`px-3 py-1.5 rounded-full line-clamp-3 text-xs font-bold border ${getExperienceColor(job.experienceLevel)}`}
                  >
                    {job.experience}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-50">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>

                <div>
                  <span className="px-3 py-1.5 rounded-full line-clamp-3 text-xs font-bold border bg-linear-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                    {formatSalary(job.salary, job.salaryType)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-50">
                  <Briefcase className="w-4 h-4 text-orange-600" />
                </div>

                <div>
                  <span
                    className={`px-3 py-1.5 rounded-full line-clamp-3 text-xs font-bold border ${getJobTypeColor(job.jobType)}`}
                  >
                    {normalizeJobTypeForDisplay(job.jobType)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 mt-auto">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />

                <span className="text-sm text-gray-500">
                  {formatDate(job.datePosted)}
                </span>
              </div>

              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getCategoryColor(job.category)}`}
              >
                {job.category}
              </span>
            </div>

            <div className="flex items-center justify-between mt-2">
              <a
                className={`flex cursor-pointer items-center gap-2 px-4 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 ${
                  appliedJobs.includes(String(job.id))
                    ? "bg-gray-300 text-gray-800"
                    : "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                }`}
                onClick={(e) => {
                  e?.preventDefault?.();
                  if (!appliedJobs.includes(String(job.id))) {
                    openConfirmPopup(job);
                  }
                }}
              >
                {appliedJobs.includes(String(job.id)) ? "Applied" : "Apply Now"}
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="flex items-center gap-2">
                <Link
                  to={`/job-details/${job.id}`}
                  className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 inline-flex items-center justify-center"
                  aria-label="View job details"
                >
                  <Eye className="w-5 h-5" />
                </Link>

                <button
                  onClick={() => loadToggleSaveJob(job.id)}
                  aria-label={
                    savedJobs.includes(String(job.id))
                      ? "Unsave job"
                      : "Save job"
                  }
                  className={`p-3 cursor-pointer rounded-full transition-all duration-200 ${
                    savedJobs.includes(String(job.id))
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
