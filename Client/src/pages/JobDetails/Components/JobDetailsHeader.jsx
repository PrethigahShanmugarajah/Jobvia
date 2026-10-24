import "../Styles/JobDetails.css";
import JobCompanyLogo from "../Components/JobCompanyLogo";
import { Bookmark, Building } from "lucide-react";

const JobDetailsHeader = ({ job, BASE_URL, toggleSaveJob, savedJobs }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200/50 relative">
      <div className="shrink-0">
        <JobCompanyLogo job={job} BASE_URL={BASE_URL} />
      </div>

      <div className="flex-1 min-w-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1 sm:mb-2 animate-slide-in-right wrap-break-word">
          {job.role}
        </h1>

        <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600">
          <Building className="w-4 h-4" />
          <span className="truncate">{job.company}</span>
        </div>
      </div>

      <div className="mt-3 sm:mt-0">
        <button
          onClick={toggleSaveJob}
          className={`p-3 sm:p-4 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center ${
            savedJobs.includes(String(job.id))
              ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-xl"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          aria-label={
            savedJobs.includes(String(job.id)) ? "Unsave job" : "Save job"
          }
        >
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default JobDetailsHeader;
