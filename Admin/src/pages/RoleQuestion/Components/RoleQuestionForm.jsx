import { InputField } from "../../../components/FormField/InputField";
import { Briefcase, FileText, Hash, Image as ImageIcon } from "lucide-react";
import { FileInputField } from "../../../components/FormField/FileInputField";
import {
  handleCSVUploadService,
  handleImageChangeService,
} from "../Services/RoleQuestionServices";
import { ThreeDots } from "react-loader-spinner";

const RoleQuestionForm = ({
  roleName,
  setRoleName,
  totalQuestions,
  setTotalQuestions,
  imagePreview,
  setImagePreview,
  csvFile,
  setCsvFile,
  setQuestions,
  isUploading,
  setIsUploading,
  handleAddRoleQuestion,
  setImageFile,
  imageFile,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <InputField
              label="Role Name"
              name="roleName"
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="e.g., Frontend Developer"
              required
              iconLeft={<Briefcase size={18} />}
            />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <InputField
              label="Total Questions"
              name="totalQuestions"
              type="text"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
              placeholder="e.g., 10k+, 500+"
              required
              iconLeft={<Hash size={18} />}
            />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <FileInputField
              label="Upload Image"
              name="roleImage"
              accept="image/*"
              size="m"
              required
              imagePreview
              previewUrl={imagePreview}
              value={imageFile}
              triggerText="Upload Image"
              TriggerIcon={ImageIcon}
              onChange={(file) => {
                setImageFile(file || null);

                if (file) {
                  handleImageChangeService(
                    { target: { files: [file] } },
                    setImagePreview,
                  );
                } else {
                  setImagePreview("");
                }
              }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <FileInputField
              label="Upload CSV"
              name="roleQuestionsCsv"
              accept=".csv"
              size="m"
              required
              imagePreview={false}
              fileName={csvFile?.name || ""}
              triggerText="Upload CSV"
              TriggerIcon={FileText}
              onChange={(file, e) => {
                if (file) {
                  handleCSVUploadService(
                    e || { target: { files: [file] } },
                    setCsvFile,
                    setQuestions,
                    setIsUploading,
                  );
                } else {
                  setCsvFile(null);
                }
              }}
            />

            <p className="mt-3 text-gray-500 text-sm">
              CSV headers: question, answer, keyPoints, company, date. Use ; or
              | inside a cell for multiple values. Company may include a date,
              e.g., Google (2021-01-01).
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={handleAddRoleQuestion}
          disabled={isUploading}
          className={`bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200 transform focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 flex items-center gap-2 ${
            isUploading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isUploading ? (
            <>
              <ThreeDots
                visible={true}
                height="24"
                width="40"
                color="#FFFFFF"
                secondaryColor="#E2E8F0"
                radius="9"
                ariaLabel="posting-job-loader"
              />
            </>
          ) : (
            "Add Role Question"
          )}
        </button>
      </div>
    </>
  );
};

export default RoleQuestionForm;
