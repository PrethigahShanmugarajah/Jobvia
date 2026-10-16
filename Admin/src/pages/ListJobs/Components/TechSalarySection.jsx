// Jobvia / Admin / src / pages / ListJobs Components / TechSalarySection.jsx
import { useAppContext } from "../../../context/appContext";
import SectionHeader from "./SectionHeader";
import { Code, Plus } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import {
  addArrayItemService,
  removeArrayItemService,
} from "../Services/ListJobsServices";
import Badge from "./Badge";
import { SelectInput } from "../../../components/FormField/SelectInput";

const TechSalarySection = ({
  editingJob,
  setEditingJob,
  handleFieldChange,
  newTech,
  setNewTech,
}) => {
  const { CURRENCY } = useAppContext();

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm overflow-visible">
      <SectionHeader
        icon={<Code size={16} className="text-indigo-500" />}
        title="Tech Stack & Compensation"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <InputField
            label="Tech Stack"
            name="newTech"
            type="text"
            iconLeft={<Code size={12} className="text-slate-400" />}
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addArrayItemService(
                  editingJob,
                  setEditingJob,
                  "techstack",
                  newTech,
                );
                setNewTech("");
              }
            }}
            placeholder="Add a technology and press Enter"
            required
          />

          <div className="flex flex-wrap gap-2 mt-2">
            {(editingJob?.techstack || []).map((tech, idx) => (
              <Badge
                key={idx}
                variant="tech"
                onRemove={() =>
                  removeArrayItemService(setEditingJob, "techstack", idx)
                }
                className="inline-flex items-center min-w-0 max-w-full mt-1.5"
              >
                <Code size={12} />
                <span className="ml-1 break-all whitespace-normal max-w-full">
                  {tech}
                </span>
              </Badge>
            ))}
          </div>

          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => {
                addArrayItemService(
                  editingJob,
                  setEditingJob,
                  "techstack",
                  newTech,
                );
                setNewTech("");
              }}
              className="p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100"
              aria-label="Add tech"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-end gap-2">
            <div className="flex-1 min-w-0">
              <InputField
                label="Salary"
                name="salaryAmount"
                type="number"
                iconLeft={
                  <span className="text-xs text-slate-400">{CURRENCY}</span>
                }
                min="0"
                step="any"
                value={
                  typeof editingJob?.salary?.amount === "number" &&
                  editingJob.salary.amount > 0
                    ? editingJob.salary.amount
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value;
                  const amountValue = raw === "" ? undefined : Number(raw);

                  handleFieldChange("salary", {
                    ...(editingJob?.salary || {}),
                    amount: amountValue,
                  });
                }}
                placeholder="Amount"
                required
              />
            </div>

            <div className="flex-1 min-w-0">
              <SelectInput
                label="Salary Period"
                value={editingJob?.salary?.period ?? "month"}
                onChange={(value) =>
                  handleFieldChange("salary", {
                    ...(editingJob?.salary || {}),
                    period: value,
                  })
                }
                options={[
                  { value: "hour", label: "/ hour" },
                  { value: "day", label: "/ day" },
                  { value: "week", label: "/ week" },
                  { value: "month", label: "/ month" },
                  { value: "year", label: "/ year" },
                ]}
                placeholder="Select salary period"
                isClearable={false}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechSalarySection;
