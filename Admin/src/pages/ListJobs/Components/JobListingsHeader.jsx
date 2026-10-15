// Jobvia / Admin / src / pages / ListJobs Components / JobListingsHeader.jsx
import { InputField } from "../../../components/FormField/InputField";
import { Briefcase, X } from "lucide-react";
import Badge from "./Badge";

const JobListingsHeader = ({ companyFilter, setCompanyFilter, jobsCount }) => {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Job Listings
      </h1>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* -------- Company Filter -------- */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg w-full sm:w-auto">
          <InputField
            name="companyFilter"
            type="text"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            placeholder="Filter by company"
            size="xxs"
          />

          {companyFilter && (
            <button
              onClick={() => setCompanyFilter("")}
              aria-label="Clear filter"
              className="text-slate-400 hover:text-slate-600 shrink-0"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <Badge variant="default" className="shrink-0">
          <Briefcase size={14} />
          {jobsCount} Showing
        </Badge>
      </div>
    </header>
  );
};

export default JobListingsHeader;
