import SectionHeader from "./SectionHeader";
import { Calendar, GraduationCap, Users } from "lucide-react";
import ArrayField from "./ArrayField";
import {
  addArrayItemService,
  removeArrayItemService,
} from "../Services/ListJobsServices";
import { InputField } from "../../../components/FormField/InputField";

const EducationInfoSection = ({
  editingJob,
  setEditingJob,
  handleFieldChange,
  newEducation,
  setNewEducation,
}) => {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <SectionHeader
        icon={<GraduationCap size={16} className="text-indigo-500" />}
        title="Education & Additional Info"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ArrayField
          title="Education"
          items={editingJob?.education || []}
          value={newEducation}
          onChange={setNewEducation}
          onAdd={() => {
            addArrayItemService(
              editingJob,
              setEditingJob,
              "education",
              newEducation,
            );
            setNewEducation("");
          }}
          onRemove={(idx) =>
            removeArrayItemService(setEditingJob, "education", idx)
          }
          name="newEducation"
          placeholder="Add education"
          ariaLabel="education"
        />

        <div>
          <div>
            <InputField
              label="Openings"
              name="openings"
              type="number"
              min="1"
              value={editingJob?.openings ?? 1}
              onChange={(e) =>
                handleFieldChange("openings", Number(e.target.value))
              }
              iconLeft={<Users size={14} className="text-slate-400" />}
              aria-label="Openings"
              required
            />
          </div>

          <div className="mt-4">
            <InputField
              label="Post Date (Cannot be changed)"
              name="postDate"
              type="date"
              value={editingJob?.postDate ?? ""}
              onChange={(e) => handleFieldChange("postDate", e.target.value)}
              iconLeft={<Calendar size={14} className="text-slate-400" />}
              aria-label="Post date"
              disabled
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationInfoSection;
