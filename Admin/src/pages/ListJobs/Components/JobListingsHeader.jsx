// Jobvia / Admin / src / pages / ListJobs / Components / JobListingsHeader.jsx
import PageHeader from "../../../components/PageHeader";
import { Briefcase, X } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import Badge from "./Badge";

const JobListingsHeader = ({ companyFilter, setCompanyFilter, jobsCount }) => {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <PageHeader
        title="Job Listings"
        description="Browse and manage your job listings"
        Icon={Briefcase}
      />

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
