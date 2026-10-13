// Jobvia / Admin / src / pages / Dashboard / Components / DashboardJobList.jsx
import { Building } from "lucide-react";
import { SelectInput } from "../../../components/FormField/SelectInput";
import { ThreeDots } from "react-loader-spinner";
import DashboardJobCard from "./DashboardJobCard";

const DashboardJobList = ({
  loading,
  filteredJobs,
  statusFilter,
  setStatusFilter,
  navigate,
  confirmCloseJob,
  handleImageError,
  clearFilters,
}) => {
  return (
    <div className="animate-fadeIn animation-delay-200">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 flex items-center gap-3">
          <Building className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />

          {statusFilter === "active"
            ? "Active Roles"
            : statusFilter === "closed"
              ? "Closed Roles"
              : "All Roles"}
        </h2>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-40 sm:w-44 shrink-0">
            <SelectInput
              options={[
                { value: "active", label: "Active Jobs" },
                { value: "closed", label: "Closed Jobs" },
                { value: "all", label: "All Jobs" },
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              isClearable={false}
            />
          </div>

          <div className="flex h-12 min-w-19 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-slate-100 bg-white px-3 shadow-sm sm:px-4">
            <span className="text-sm text-slate-400">
              {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
            </span>
          </div>
        </div>
      </div>

      {/* -------- Job Card -------- */}
      {loading ? (
        <div className="flex justify-center py-20">
          <ThreeDots
            height="50"
            width="60"
            radius="4"
            color="#3B82F6"
            ariaLabel="loading"
            visible={true}
          />
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredJobs.map((job) => (
            <DashboardJobCard
              key={job.id}
              job={job}
              navigate={navigate}
              confirmCloseJob={confirmCloseJob}
              handleImageError={handleImageError}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16 bg-white/50 rounded-3xl border border-slate-100">
          <Building className="w-12 h-12 text-slate-300 mx-auto mb-4" />
         
          <h3 className="text-lg font-medium text-slate-600">
            No Jobs Match Your Filters
          </h3>

          <p className="text-sm text-slate-400 mt-1">
            Try adjusting your filters to find more jobs.
          </p>

          <button
            className="mt-4 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardJobList;
