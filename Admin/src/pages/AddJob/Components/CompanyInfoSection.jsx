import { FileInputField } from "../../../components/FormField/FileInputField";
import { Briefcase, Building2, Upload } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";

const CompanyInfoSection = ({ formData, setFormData }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      <div className="col-span-1">
        <FileInputField
          label="Company Logo"
          name="image"
          accept="image/*"
          size="s"
          trigger
          triggerText="Browse Image"
          TriggerIcon={Upload}
          value={formData.image}
          onChange={(file) => {
            setFormData((prev) => ({ ...prev, image: file }));
          }}
          required
        />
      </div>

      <div className="md:col-span-2 space-y-3 sm:space-y-4">
        <InputField
          iconLeft={<Briefcase size={18} />}
          label="Role Name"
          name="roleName"
          type="text"
          size="s"
          value={formData.roleName}
          onChange={(e) =>
            setFormData({ ...formData, roleName: e.target.value })
          }
          placeholder="e.g: Senior Frontend Developer"
          required
        />

        <InputField
          iconLeft={<Building2 size={18} />}
          label="Company Name"
          name="companyName"
          type="text"
          size="s"
          value={formData.companyName}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
          placeholder="e.g: Acme Inc"
          required
        />
      </div>
    </div>
  );
};

export default CompanyInfoSection;
