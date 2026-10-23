// Jobvia / Client / src / pages / FindJob / Components / ActiveFilters.jsx
import "../Styles/FindJob.css";
import { normalizeJobTypeForDisplay } from "../../../utils/jobFormatters";
import { X } from "lucide-react";

const ActiveFilters = ({ filters, handleFilterChange }) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">
        Active Filters
      </h4>

      <div className="flex flex-wrap gap-2">
        {filters.jobType.map((type) => (
          <span
            key={type}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium border bg-blue-100 text-blue-700 border-blue-200"
          >
            {normalizeJobTypeForDisplay(type)}
            <button
              onClick={() => handleFilterChange("jobType", type)}
              className="ml-1 hover:text-opacity-80"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {filters.category.map((cat) => (
          <span
            key={cat}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium border bg-green-100 text-green-700 border-green-200"
          >
            {cat}
            <button
              onClick={() => handleFilterChange("category", cat)}
              className="ml-1 hover:text-opacity-80"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}

        {filters.minSalary && (
          <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium border bg-yellow-100 text-yellow-700 border-yellow-200">
            Min: {filters.minSalary}
            <button
              onClick={() => handleFilterChange("minSalary", "")}
              className="ml-1 hover:text-opacity-80"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}

        {filters.maxSalary && (
          <span className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm font-medium border bg-yellow-100 text-yellow-700 border-yellow-200">
            Max: {filters.maxSalary}
            <button
              onClick={() => handleFilterChange("maxSalary", "")}
              className="ml-1 hover:text-opacity-80"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;
