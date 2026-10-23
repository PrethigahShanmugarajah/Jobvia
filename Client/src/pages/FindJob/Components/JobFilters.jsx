// Jobvia / Client / src / pages / FindJob / Components / JobFilters.jsx
import "../Styles/FindJob.css";
import { BarChart3, BriefcaseBusiness, Filter, X } from "lucide-react";
import { jobTypeOptions } from "../../../data/jobTypeOptions";
import { InputField } from "../../../components/FormField/InputField";
import { categories } from "../../../utils/jobConstants";
import ActiveFilters from "./ActiveFilters";

const JobFilters = ({
  CURRENCY,
  filtersRef,
  filters,
  jobs,
  activeFilterCount,
  clearFilters,
  setShowFilters,
  handleFilterChange,
}) => {
  return (
    <div className="w-full lg:w-1/4 block lg:block" ref={filtersRef}>
      <div className="sticky top-4 pb-8">
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Filter className="w-6 h-6 text-blue-600" />

              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            </div>

            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all
                </button>
              )}

              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <BriefcaseBusiness className="w-4 h-4" />
              Job Type
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-3 xl:grid-cols-2 gap-2">
              {jobTypeOptions.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleFilterChange("jobType", type.value)}
                  className={`px-4 py-3 rounded-xl text-xs transition-all duration-300 font-medium ${
                    filters.jobType.includes(type.value)
                      ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <span className="text-sm font-semibold">{CURRENCY}</span>
              Salary Range
            </h3>

            <div className="space-y-4 grid grid-cols-2 gap-3">
              <div>
                <InputField
                  label="Minimum Salary"
                  labelPosition="top"
                  name="minSalary"
                  type="number"
                  placeholder="3000"
                  value={filters.minSalary}
                  onChange={(e) =>
                    handleFilterChange("minSalary", e.target.value)
                  }
                />
              </div>

              <div>
                <InputField
                  label="Maximum Salary"
                  labelPosition="top"
                  name="maxSalary"
                  type="number"
                  placeholder="15000"
                  value={filters.maxSalary}
                  onChange={(e) =>
                    handleFilterChange("maxSalary", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <BarChart3 className="w-4 h-4" />
              Category
            </h3>

            <div className="space-y-2 grid md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-1 gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterChange("category", category)}
                  className={`w-full cursor-pointer h-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 font-medium ${
                    filters.category.includes(category)
                      ? "bg-linear-to-r from-green-500 to-green-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      filters.category.includes(category)
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {jobs.filter((job) => job.category === category).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <ActiveFilters
              filters={filters}
              handleFilterChange={handleFilterChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
