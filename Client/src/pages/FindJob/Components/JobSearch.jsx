// Jobvia / Client / src / pages / FindJob / Components / JobSearch.jsx
import "../Styles/FindJob.css";
import { InputField } from "../../../components/FormField/InputField";
import { MapPin, Briefcase, Building, X, Users } from "lucide-react";

const JobSearch = ({
  searchTerm,
  handleSearchChange,
  isSearchActive,
  activeFilterCount,
  clearFilters,
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200/80 mb-8 transform transition-all duration-300 hover:shadow-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <InputField
              name="company"
              type="text"
              label="Company"
              placeholder="Company name"
              value={searchTerm.company}
              onChange={(e) => handleSearchChange("company", e.target.value)}
              iconLeft={
                <Building className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              }
            />
          </div>

          <div>
            <InputField
              name="location"
              type="text"
              label="Location"
              placeholder="City"
              value={searchTerm.location}
              onChange={(e) => handleSearchChange("location", e.target.value)}
              iconLeft={
                <MapPin className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              }
            />
          </div>

          <div>
            <InputField
              name="role"
              type="text"
              label="Role / Keyword"
              placeholder="Job title or keyword"
              value={searchTerm.role}
              onChange={(e) => handleSearchChange("role", e.target.value)}
              iconLeft={
                <Briefcase className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              }
            />
          </div>

          <div>
            <InputField
              name="experience"
              type="text"
              label="Experience"
              placeholder="Experience"
              value={searchTerm.experience}
              onChange={(e) => handleSearchChange("experience", e.target.value)}
              iconLeft={
                <Users className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              }
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {(isSearchActive || activeFilterCount > 0) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-medium transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                <X className="w-5 h-5" />
                Clear All
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
