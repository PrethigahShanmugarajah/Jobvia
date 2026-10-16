// Jobvia / Admin / src / pages / ListJobs Components / OverviewSection.jsx
import { TextAreaField } from "../../../components/FormField/TextAreaField";
import { FileText } from "lucide-react";

const OverviewSection = ({ editingJob, handleFieldChange }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
        <FileText size={16} className="text-indigo-500" />
        Overview
      </h4>

      <TextAreaField
        name="overview"
        value={editingJob?.overview ?? ""}
        onChange={(value) => handleFieldChange("overview", value)}
        rows={3}
        placeholder="Brief description of the role..."
      />
    </div>
  );
};

export default OverviewSection;
