import { getBadgeClasses } from "../../../constants/badgeStyles";
import { X } from "lucide-react";

const Badge = ({ children, variant = "default", onRemove, className = "" }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium shadow-sm ${getBadgeClasses(variant, "")} ${className}`}
    >
      {children}

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 hover:text-rose-600 focus:outline-none"
          aria-label="Remove"
        >
          <X size={12} />
        </button>
      )}
    </span>
  );
};

export default Badge;
