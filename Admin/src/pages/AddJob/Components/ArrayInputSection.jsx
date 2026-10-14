// Jobvia / Admin / src / pages / AddJob / Components / ArrayInputSection.jsx
import { ListChecks, Plus, Trash2 } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import {
  addArrayFieldService,
  handleArrayChangeService,
  removeArrayFieldService,
} from "../Services/AddJobServices";

const ArrayInputSection = ({
  title,
  fieldName,
  icon: Icon = ListChecks,
  placeholder,
  addButtonText,
  formData,
  setFormData,
}) => {
  const items = formData[fieldName];

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 font-medium text-black">
        <Icon size={16} className="text-indigo-500" />
        {title} <span className="text-rose-500">*</span>
      </label>

      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-2 flex-col sm:flex-row items-start"
        >
          <InputField
            name={`${fieldName}-${index}`}
            type="text"
            size="s"
            value={item}
            onChange={(e) =>
              handleArrayChangeService(
                formData,
                setFormData,
                fieldName,
                index,
                e.target.value,
              )
            }
            placeholder={placeholder}
            inputClassName="flex-1"
          />

          {items.length > 1 && (
            <button
              type="button"
              onClick={() =>
                removeArrayFieldService(formData, setFormData, fieldName, index)
              }
              className="p-2 sm:p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all hover:scale-110"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() => addArrayFieldService(formData, setFormData, fieldName)}
        className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-transform hover:translate-x-1"
      >
        <Plus size={14} />
        {addButtonText}
      </button>
    </div>
  );
};

export default ArrayInputSection;
