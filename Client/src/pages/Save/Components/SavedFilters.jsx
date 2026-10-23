// Jobvia / Client / src / pages / Save / Components / SavedFilters.jsx
import "../Styles/Save.css";
import { SelectInput } from "../../../components/FormField/SelectInput";

const SavedFilters = ({
  uiFilter,
  setUiFilter,
  uiFilterId,
  setUiFilterId,
  availableRoles,
  availableCompanies,
  clearFilter,
}) => {
  return (
    <div className="w-full md:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
      <SelectInput
        value={uiFilter}
        onChange={(value) => {
          setUiFilter(value);
          setUiFilterId(null);
        }}
        options={[
          { value: "all", label: "All" },
          { value: "role", label: "Role" },
          { value: "company", label: "Company" },
        ]}
        isClearable={false}
        className="w-full sm:w-30"
      />

      {uiFilter === "role" && (
        <SelectInput
          value={uiFilterId || ""}
          onChange={(value) => setUiFilterId(value || null)}
          options={[
            { value: "", label: "Any role" },
            ...availableRoles.map((r) => ({
              value: r._id,
              label: r.roleName,
            })),
          ]}
          isClearable={false}
          className="w-full sm:w-auto"
        />
      )}

      {uiFilter === "company" && (
        <SelectInput
          value={uiFilterId || ""}
          onChange={(value) => setUiFilterId(value || null)}
          options={[
            { value: "", label: "Any company" },
            ...availableCompanies.map((c) => ({
              value: c._id,
              label: c.companyName,
            })),
          ]}
          isClearable={false}
          className="w-full sm:w-auto"
        />
      )}

      <button
        onClick={clearFilter}
        className="rounded-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium transition-all hover:shadow-sm active:scale-95 border border-gray-200 w-full sm:w-auto"
      >
        Clear
      </button>
    </div>
  );
};

export default SavedFilters;
