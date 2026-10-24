import { Building, MapPin, Users } from "lucide-react";

const DashboardJobCard = ({
  job,
  navigate,
  confirmCloseJob,
  handleImageError,
}) => {
  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 overflow-hidden"
      key={job.id}
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-50/30 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative p-4 sm:p-5 md:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
              <img
                src={job.logo}
                alt={job.name}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />

              <div className="hidden w-full h-full bg-linear-to-br from-slate-200 to-slate-300 items-center justify-center">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
              </div>
            </div>
          </div>

          {/* -------- Jobs Details -------- */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-indigo-600 group-hover:text-blue-600 transition-colors">
              {job.role}
            </h3>

            <p className="text-sm font-medium text-slate-600 flex items-center gap-1 mt-0.5">
              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {job.name}
            </p>

            <p className="text-xs sm:text-sm text-emerald-600 mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-500" />
              {job.location}
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200">
            {job.category}
          </span>

          <div className="flex items-center gap-1.5 text-sm">
            <Users className="w-4 h-4 text-slate-400" />

            <span className="font-semibold text-slate-700">
              {job.applicants}
            </span>

            <span className="text-slate-400 text-xs">applicants</span>
          </div>
        </div>

        <div className="relative pt-4 flex items-center justify-center gap-3 duration-300 pointer-events-none">
          <button
            onClick={() =>
              navigate("/applicants", {
                state: {
                  jobId: job.id,
                  role: job.role,
                  companyName: job.name,
                },
              })
            }
            className="pointer-events-auto bg-linear-to-r from-blue-500 to-indigo-500 text-white cursor-pointer px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-105"
          >
            View Applicants
          </button>

          {job.status === "active" && (
            <button
              onClick={() => confirmCloseJob(job)}
              className="pointer-events-auto bg-linear-to-r from-rose-500 to-pink-500 text-white cursor-pointer px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transform transition-all hover:scale-105"
            >
              Close Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardJobCard;
