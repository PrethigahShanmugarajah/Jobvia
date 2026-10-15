// Jobvia / Admin / src / pages / ListJobs Components / CompanyImageSection.jsx
import { Image as ImageIcon } from "lucide-react";
import { CompanyFallback, CompanyPlaceholder } from "../../../assets/assets";
import Field from "./Field";

const CompanyImageSection = ({
  editingJob,
  fileInputRef,
  handleBrowseClick,
  handleFileChange,
  handleRemoveImage,
}) => {
  return (
    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
      <h4 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
        <ImageIcon size={16} className="text-indigo-500" />
        Company Image
      </h4>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="relative group">
          <div className="w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg bg-white flex items-center justify-center">
            <img
              src={editingJob.image || CompanyPlaceholder}
              alt="Company"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = CompanyFallback;
              }}
            />
          </div>
        </div>

        <div className="flex-1 w-full">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-hidden
          />

          <Field
            label="Upload Image"
            icon={<ImageIcon size={14} className="text-slate-400" />}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1">
                <div className="text-sm text-slate-700 mb-1">
                  Click{" "}
                  <button
                    type="button"
                    onClick={handleBrowseClick}
                    className="underline font-medium"
                  >
                    Browse
                  </button>{" "}
                  to select an image from your device.
                </div>

                <div className="text-xs text-slate-500">
                  {editingJob.image
                    ? editingJob.image.startsWith("data:")
                      ? "Using uploaded image (local preview)"
                      : "Using external image URL"
                    : "No image selected"}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleBrowseClick}
                  className="px-3 py-2 cursor-pointer rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-sm"
                >
                  Browse
                </button>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="px-3 cursor-pointer py-2 rounded-md bg-rose-50 text-rose-700 hover:bg-rose-100 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </Field>
        </div>
      </div>
    </div>
  );
};

export default CompanyImageSection;
