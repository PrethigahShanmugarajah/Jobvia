// Jobvia / Client / src / components / ConfirmPopup.jsx
import { X } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const ConfirmPopup = ({
  onClose,
  onConfirm,
  loading = false,
  item,
  title,
  description,
  confirmText,
  closeText = "Close",
  confirmColor = "blue",
  maxWidth = "max-w-md",
  showCloseIcon = true,
  children,
}) => {
  const body = children ?? description;

  const colorClasses = {
    blue: {
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      title: "text-blue-600",
      loader: "#3B82F6",
      border: "border-blue-300",
    },

    gray: {
      button: "bg-gray-600 hover:bg-gray-700 text-white",
      title: "text-gray-600",
      loader: "#4B5563",
      border: "border-gray-300",
    },
  };

  const colors = colorClasses[confirmColor] || colorClasses.blue;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full ${maxWidth} rounded-xl border border-gray-300 bg-white p-6 shadow-lg`}
      >
        {showCloseIcon && (
          <button
            type="button"
            onClick={onClose}
            disabled={!!loading}
            className="absolute top-4 right-4 text-black hover:text-gray-700 disabled:opacity-60"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}

        <div className="mt-2 text-center">
          <h4 className={`mb-2 text-lg font-semibold ${colors.title}`}>
            {title || "Are you sure?"}
          </h4>

          <p className="text-sm text-black">
            {body ? (
              body
            ) : (
              <>
                Are you sure you want to continue with <b>{item}</b>? <br />
                Please confirm this action. <br />
                This action cannot be undone.
              </>
            )}
          </p>

          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={!!loading}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-black transition disabled:opacity-60"
            >
              {closeText}
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={!!loading}
              className={`min-w-22.5 flex items-center justify-center rounded-lg px-4 py-2 transition disabled:opacity-60 ${
                loading ? `border ${colors.border} bg-white` : colors.button
              }`}
            >
              {loading ? (
                <ThreeDots
                  height="24"
                  width="36"
                  radius="4"
                  color={colors.loader}
                  ariaLabel="loading"
                  visible={true}
                />
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
