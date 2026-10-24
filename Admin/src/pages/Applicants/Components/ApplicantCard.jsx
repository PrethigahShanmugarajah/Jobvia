import { Briefcase, Calendar, Mail } from "lucide-react";
import { formatDate } from "../../../utils/date";

const ApplicantCard = ({ app, index, onViewResume }) => {
  return (
    <div
      key={app.id}
      className="group relative bg-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border-2 border-transparent shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col h-full"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative flex flex-col items-center text-center h-full z-10">
        <p className="font-semibold text-lg sm:text-xl text-blue-600 mb-1 wrap-break-word w-full">
          {app.name}
        </p>

        <div className="space-y-1 w-full mb-2 sm:mb-3">
          <div className="flex items-center justify-center gap-1 text-sm sm:text-sm text-slate-600">
            <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="break-all max-w-48 sm:max-w-[18rem]">
              {app.email}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1 text-sm sm:text-sm text-slate-600">
            <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{app.phone}</span>
          </div>
        </div>

        <div className="space-y-2 w-full mb-4">
          <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
            <Briefcase className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="font-medium text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full text-xs sm:text-sm">
              {app.appliedForRole}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium bg-amber-50 px-3 py-1 rounded-full text-xs sm:text-sm text-amber-700">
              {formatDate(app.appliedAt)}
            </span>
          </div>
        </div>

        <div className="mt-auto pt-2 w-full">
          {app.resumeFile ? (
            <button
              onClick={() => onViewResume(app.resumeFile, app.userId)}
              className="relative inline-flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 overflow-hidden font-medium text-indigo-600 rounded-full shadow-md group bg-linear-to-r from-indigo-50 to-purple-50 transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto cursor-pointer"
            >
              <span className="relative flex items-center gap-2 text-sm sm:text-sm font-semibold transition-colors duration-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>

                <span>View Resume</span>
              </span>
            </button>
          ) : (
            <span className="text-xs text-slate-400 italic">
              No Resume Provided
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
