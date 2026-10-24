import SectionHeader from "./SectionHeader";
import { FileText } from "lucide-react";
import { TextAreaField } from "../../../components/FormField/TextAreaField";

const OverviewSection = ({ editingJob, handleFieldChange }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <SectionHeader
        icon={<FileText size={16} className="text-indigo-500" />}
        title="Overview"
      />

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
