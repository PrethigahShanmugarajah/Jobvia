// Jobvia / Admin / src / pages / ListJobs Components / OverviewSection.jsx
import { TextAreaField } from "../../../components/FormField/TextAreaField";
import { FileText } from "lucide-react";

const OverviewSection = ({ editingJob, handleFieldChange }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <TextAreaField
        label="Overview"
        name="overview"
        iconLeft={<FileText size={12} className="text-slate-400" />}
        value={editingJob?.overview ?? ""}
        onChange={(value) => handleFieldChange("overview", value)}
        rows={3}
        placeholder="Brief description of the role..."
        required
      />
    </div>
  );
};

export default OverviewSection;
