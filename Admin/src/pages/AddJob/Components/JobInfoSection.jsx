// Jobvia / Admin / src / pages / AddJob / Components / JobInfoSection.jsx
import { SelectInput } from "../../../components/FormField/SelectInput";
import { Briefcase, Calendar, FileText, Tag, Users } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import { categories } from "../../../utils/jobConstants";
import { TextAreaField } from "../../../components/FormField/TextAreaField";

const JobInfoSection = ({ formData, setFormData }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        <SelectInput
          iconLeft={<Briefcase size={18} />}
          label="Job Type"
          name="jobType"
          size="lg"
          value={formData.jobType}
          onChange={(value) => setFormData({ ...formData, jobType: value })}
          options={[
            { value: "full-time", label: "Full-time" },
            { value: "part-time", label: "Part-time" },
            { value: "contract", label: "Contract" },
            { value: "internship", label: "Internship" },
          ]}
          isClearable={false}
        />

        <InputField
          iconLeft={<Calendar size={18} />}
          label="Post Date (Automatically set to today)"
          name="postDate"
          type="date"
          size="s"
          value={formData.postDate}
          onChange={(e) =>
            setFormData({ ...formData, postDate: e.target.value })
          }
          disabled
          required
        />

        <SelectInput
          iconLeft={<Tag size={18} />}
          label="Category"
          name="category"
          size="lg"
          value={formData.category}
          onChange={(value) => setFormData({ ...formData, category: value })}
          options={[
            { value: "", label: "Select Category", isDisabled: true },
            ...categories.map((cat) => ({
              value: cat,
              label: cat,
            })),
          ]}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <InputField
          iconLeft={<Users size={18} />}
          label="Openings"
          name="openings"
          type="number"
          size="s"
          value={formData.openings}
          onChange={(e) =>
            setFormData({
              ...formData,
              openings: parseInt(e.target.value) || 1,
            })
          }
          required
        />

        <TextAreaField
          iconLeft={<FileText size={18} />}
          label="Overview"
          name="overview"
          rows={3}
          size="s"
          value={formData.overview}
          onChange={(value) => setFormData({ ...formData, overview: value })}
          placeholder="Brief description of the role..."
          required
        />
      </div>
    </>
  );
};

export default JobInfoSection;
