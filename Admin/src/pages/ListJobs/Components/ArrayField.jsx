import SectionHeader from "./SectionHeader";
import { Plus, X } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";

const ArrayField = ({
  title,
  icon,
  items = [],
  value,
  onChange,
  onAdd,
  onRemove,
  name,
  placeholder,
  ariaLabel,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm overflow-visible">
      {title && <SectionHeader icon={icon} title={title} />}

      <ul className="space-y-1 mb-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-slate-700 min-w-0"
          >
            <span className="text-indigo-500 mt-0.5">•</span>

            <span className="flex-1 min-w-0 wrap-break-word whitespace-normal">
              {item}
            </span>

            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="text-slate-400 hover:text-red-600 ml-2 shrink-0"
              aria-label={`Remove ${ariaLabel} ${idx + 1}`}
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 flex-nowrap">
        <InputField
          name={name}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={ariaLabel}
        />

        <button
          type="button"
          onClick={onAdd}
          className="p-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 shrink-0"
          aria-label={`Add ${ariaLabel}`}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default ArrayField;
