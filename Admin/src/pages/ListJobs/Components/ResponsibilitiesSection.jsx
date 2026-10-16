// Jobvia / Admin / src / pages / ListJobs Components / ResponsibilitiesSection.jsx
import { ListChecks, Plus, X } from "lucide-react";
import {
  addArrayItemService,
  removeArrayItemService,
} from "../Services/ListJobsServices";
import { InputField } from "../../../components/FormField/InputField";

const ResponsibilitiesSection = ({
  editingJob,
  setEditingJob,
  newResponsibility,
  setNewResponsibility,
}) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm overflow-visible">
      <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
        <ListChecks size={16} className="text-indigo-500" />
        Responsibilities
      </h4>

      <ul className="space-y-1 mb-3">
        {(editingJob?.responsibilities || []).map((resp, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-slate-700 min-w-0"
          >
            <span className="text-indigo-500 mt-0.5">•</span>

            <span className="flex-1 min-w-0 wrap-break-word whitespace-normal">
              {resp}
            </span>

            <button
              type="button"
              onClick={() =>
                removeArrayItemService(setEditingJob, "responsibilities", idx)
              }
              className="text-slate-400 hover:text-red-600 ml-2 shrink-0"
              aria-label={`Remove responsibility ${idx + 1}`}
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 flex-nowrap">
        <InputField
          name="newResponsibility"
          type="text"
          value={newResponsibility}
          onChange={(e) => setNewResponsibility(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addArrayItemService(
                editingJob,
                setEditingJob,
                "responsibilities",
                newResponsibility,
              );
              setNewResponsibility("");
            }
          }}
          placeholder="Add a responsibility"
          className="flex-1 min-w-0"
        />

        <button
          type="button"
          onClick={() => {
            addArrayItemService(
              editingJob,
              setEditingJob,
              "responsibilities",
              newResponsibility,
            );
            setNewResponsibility("");
          }}
          className="p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 shrink-0"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default ResponsibilitiesSection;
