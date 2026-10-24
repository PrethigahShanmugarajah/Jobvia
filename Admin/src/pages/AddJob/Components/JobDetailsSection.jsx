import { InputField } from "../../../components/FormField/InputField";
import { Briefcase, MapPin } from "lucide-react";
import { SelectInput } from "../../../components/FormField/SelectInput";
import { useAppContext } from "../../../context/appContext";

const JobDetailsSection = ({ formData, setFormData }) => {
  const { CURRENCY } = useAppContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      <InputField
        iconLeft={<MapPin size={18} />}
        label="Location"
        name="location"
        type="text"
        size="s"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        placeholder="e.g: New York, NY"
        required
      />

      <InputField
        iconLeft={<Briefcase size={18} />}
        label="Experience (years)"
        name="experience"
        type="text"
        size="s"
        value={formData.experience}
        onChange={(e) =>
          setFormData({ ...formData, experience: e.target.value })
        }
        placeholder="3+ Years"
        required
      />

      <div className="w-full">
        <label className="block text-sm font-medium mb-3 text-black">
          Salary <span className="text-rose-500 ml-1">*</span>
        </label>

        <div className="mt-2 flex flex-col sm:flex-row gap-2">
          <InputField
            iconLeft={<span className="text-xs font-semibold">{CURRENCY}</span>}
            name="salaryAmount"
            type="number"
            size="s"
            value={formData.salary.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                salary: { ...formData.salary, amount: e.target.value },
              })
            }
            placeholder="80000"
            inputClassName="flex-1"
          />

          <SelectInput
            name="salaryPeriod"
            size="lg"
            value={formData.salary.period}
            onChange={(value) =>
              setFormData({
                ...formData,
                salary: { ...formData.salary, period: value },
              })
            }
            options={[
              { value: "hour", label: "/ hour" },
              { value: "day", label: "/ day" },
              { value: "week", label: "/ week" },
              { value: "month", label: "/ month" },
              { value: "year", label: "/ year" },
            ]}
            isClearable={false}
            className="sm:w-44"
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
