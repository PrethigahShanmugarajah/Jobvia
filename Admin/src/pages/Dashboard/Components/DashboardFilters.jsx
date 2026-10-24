import { Filter, Search, X } from "lucide-react";
import { SelectInput } from "../../../components/FormField/SelectInput";

const DashboardFilters = ({
  companyFilter,
  setCompanyFilter,
  roleFilter,
  setRoleFilter,
  statusFilter,
  uniqueCompanies,
  uniqueRoles,
  clearFilters,
}) => {
  return (
    <div className="mb-6 sm:mb-8 bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-slate-200/50 animate-fadeIn animation-delay-100">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-slate-500" />

          <h2 className="text-base sm:text-lg font-semibold text-slate-700">
            Filters
          </h2>
        </div>

        {(companyFilter || roleFilter || statusFilter !== "active") && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" /> Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
        <SelectInput
          label="Filter by Company"
          options={[
            { value: "", label: "All Companies" },
            ...uniqueCompanies.map((company) => ({
              value: company,
              label: company,
            })),
          ]}
          value={companyFilter}
          onChange={setCompanyFilter}
          isClearable={false}
          iconLeft={<Search className="w-4 h-4" />}
        />

        {/* -------- Role Filter -------- */}
        <SelectInput
          label="Filter by Role"
          options={[
            { value: "", label: "All Roles" },
            ...uniqueRoles.map((role) => ({
              value: role,
              label: role,
            })),
          ]}
          value={roleFilter}
          onChange={setRoleFilter}
          isClearable={false}
          iconLeft={<Search className="w-4 h-4" />}
        />
      </div>
    </div>
  );
};

export default DashboardFilters;
