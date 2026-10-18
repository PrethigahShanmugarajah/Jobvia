// Jobvia / Admin / src / pages / ListCompanyQuestions / Components / EditCompanyQuestionModal.jsx
import { toast } from "react-toastify";
import { Building2, FileText, Save, Upload, X } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import {
  formatToCompactService,
  handleCsvUploadService,
  handleImageUploadService,
  handleRemoveCsvService,
  handleRemoveImageService,
} from "../Services/ListCompanyQuestionsServices";
import { FileInputField } from "../../../components/FormField/FileInputField";
import { ThreeDots } from "react-loader-spinner";

const EditCompanyQuestionModal = ({
  formData,
  setFormData,
  handleCloseModal,
  handleSave,
  isSaving,
}) => {
  const parseQuestionCount = (value) => {
    const text = String(value ?? "")
      .trim()
      .toLowerCase();
    const match = text.match(/^([\d,.]+)\s*(k|m)?\+?$/);

    if (!match) {
      return null;
    }

    const number = Number(match[1].replace(/,/g, ""));

    if (!Number.isFinite(number)) {
      return null;
    }

    return number * (match[2] === "k" ? 1000 : match[2] === "m" ? 1000000 : 1);
  };

  const handleSaveClick = () => {
    if (!formData.imagePreview) {
      toast.error("Please upload a company image.");
      return;
    }

    if (
      parseQuestionCount(formData.totalQuestions) !==
      formData.parsedQuestions.length
    ) {
      toast.error(
        `Total Questions must match the ${formData.parsedQuestions.length} questions loaded from the CSV.`,
      );
      return;
    }

    handleSave();
  };

  return (
    <div
      className="fixed inset-0 z-40 pt-30 md:pt-35 lg:pt-50 xl:pt-25 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={handleCloseModal}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg h-150 max-h-[90vh] flex flex-col overflow-hidden mx-4">
        <div className="p-6 space-y-4 flex-1 overflow-y-auto min-h-0">
          {/* --------  Name -------- */}
          <div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="p-1 text-blue-600 cursor-pointer hover:bg-blue-50 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <InputField
              label="Company Name"
              name="companyName"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
              iconLeft={<Building2 size={18} />}
              required
            />
          </div>

          {/* -------- Total Questions -------- */}
          <div>
            <InputField
              label="Total Questions"
              name="totalQuestions"
              type="text"
              value={formData.totalQuestions}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  totalQuestions: e.target.value,
                }))
              }
              onBlur={() =>
                setFormData((p) => ({
                  ...p,
                  totalQuestions: formatToCompactService(p.totalQuestions),
                }))
              }
              placeholder="e.g. 10k+ or 250 or 10k+ interviews"
              iconLeft={<FileText size={18} />}
              required
            />

            <p className="text-xs text-gray-400 mt-1">
              Accepts letters and numbers. Plain numbers are auto-formatted
              (10000 → 10k+).
            </p>
          </div>

          {/* -------- Image Upload -------- */}
          <FileInputField
            label="Company Image"
            name="companyImage"
            size="m"
            accept="image/*"
            imagePreview={true}
            previewUrl={formData.imagePreview}
            triggerText="Click to upload image"
            TriggerIcon={Upload}
            onChange={(file) => {
              if (file) {
                handleImageUploadService(
                  { target: { files: [file] } },
                  formData,
                  setFormData,
                );
              } else {
                handleRemoveImageService(formData, setFormData);
              }
            }}
            required
          />

          {/* -------- CSV Upload -------- */}
          <FileInputField
            label="CSV File"
            name="csvFile"
            fileName={formData.csvFileName}
            accept=".csv,text/csv"
            imagePreview={false}
            triggerText="Upload CSV"
            TriggerIcon={FileText}
            onChange={(file) => {
              if (file) {
                const result = handleCsvUploadService(
                  { target: { files: [file] } },
                  setFormData,
                );

                if (result?.error) {
                  toast.error(result.error);
                }
              } else {
                handleRemoveCsvService(setFormData);
              }
            }}
            required
          />

          {formData.parsedQuestions?.length > 0 && (
            <div className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
              <FileText size={14} />
              {formData.parsedQuestions.length} questions loaded
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
          <button
            onClick={handleCloseModal}
            className="px-4 text-sm py-2 cursor-pointer rounded-full border border-gray-200 hover:bg-gray-50"
            disabled={isSaving}
          >
            Cancel
          </button>

          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            className="px-4 py-2 text-sm cursor-pointer rounded-full bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <ThreeDots
                  visible={true}
                  height="24"
                  width="24"
                  color="#FFFFFF"
                  secondaryColor="#E2E8F0"
                  radius="9"
                  ariaLabel="saving-loader"
                />
              </>
            ) : (
              <>
                <Save size={14} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCompanyQuestionModal;
