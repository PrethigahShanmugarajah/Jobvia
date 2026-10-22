// Jobvia / Client / src / pages / FindJob / Components / EmptyJobs.jsx
import "../Styles/FindJob.css";
import { Search } from "lucide-react";

const EmptyJobs = ({ clearFilters }) => {
  return (
    <div className="text-center py-20">
      <div className="w-40 h-40 mx-auto mb-8 bg-linear-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center shadow-xl">
        <Search className="w-20 h-20 text-gray-400" />
      </div>

      <h3 className="text-3xl font-bold text-gray-800 mb-4">
        No matching jobs found
      </h3>

      <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
        Try adjusting your search terms or filters to find what you're looking
        for.
      </p>

      <button
        onClick={clearFilters}
        className="px-10 py-4 rounded-2xl bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default EmptyJobs;
