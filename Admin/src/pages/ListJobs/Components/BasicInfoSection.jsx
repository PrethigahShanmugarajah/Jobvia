// Jobvia / Admin / src / pages / ListJobs Components / BasicInfoSection.jsx
import { Briefcase, Building2, Clock, Layers, Tag } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import { SelectInput } from "../../../components/FormField/SelectInput";

const BasicInfoSection = ({ editingJob, handleFieldChange }) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
        <Layers size={16} className="text-indigo-500" />
        Basic Information
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputField
            label="Role"
            name="role"
            type="text"
            iconLeft={<Briefcase size={14} className="text-slate-400" />}
            value={editingJob?.role ?? ""}
            onChange={(e) => handleFieldChange("role", e.target.value)}
            required
          />
        </div>

        <div>
          <InputField
            label="Company"
            name="company"
            type="text"
            iconLeft={<Building2 size={14} className="text-slate-400" />}
            value={editingJob?.company ?? ""}
            onChange={(e) => handleFieldChange("company", e.target.value)}
            required
          />
        </div>

        <div>
          <SelectInput
            label="Category"
            iconLeft={<Tag size={14} className="text-slate-400" />}
            value={editingJob?.category ?? ""}
            onChange={(value) => handleFieldChange("category", value)}
            options={[
              { value: "Engineering", label: "Engineering" },
              { value: "IT", label: "IT" },
              { value: "Data Science", label: "Data Science" },
              { value: "Design", label: "Design" },
              { value: "Product", label: "Product" },
              { value: "Marketing", label: "Marketing" },
              { value: "Sales", label: "Sales" },
              { value: "Finance", label: "Finance" },
            ]}
            placeholder="Select category"
            isClearable={false}
            required
          />
        </div>

        <div>
          <SelectInput
            label="Job Type"
            size="m"
            iconLeft={<Clock size={14} className="text-slate-400" />}
            value={editingJob?.jobType ?? ""}
            onChange={(value) => handleFieldChange("jobType", value)}
            options={[
              { value: "full-time", label: "Full-time" },
              { value: "part-time", label: "Part-time" },
              { value: "contract", label: "Contract" },
              { value: "internship", label: "Internship" },
            ]}
            placeholder="Select job type"
            isClearable={false}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
