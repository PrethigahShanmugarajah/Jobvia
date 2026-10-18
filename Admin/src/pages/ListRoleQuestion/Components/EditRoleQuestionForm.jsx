// Jobvia / Admin / src / pages / ListRoleQuestion / Components / EditRoleQuestionForm.jsx
import { Save, X } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import { FileInputField } from "../../../components/FormField/FileInputField";
import { ThreeDots } from "react-loader-spinner";

const EditRoleQuestionForm = ({
  role,
  editFormData,
  saveLoading,
  handleImageChange,
  handleEditChange,
  handleCsvChange,
  handleEditCancel,
  handleEditSave,
}) => {
  return (
    <div className="p-3 sm:p-4 space-y-3 bg-white rounded-xl relative z-10">
      <FileInputField
        name="roleImage"
        accept="image/*"
        imagePreview
        previewUrl={editFormData.imagePreview}
        onChange={handleImageChange}
        triggerText="Browse Image"
        inputClassName="rounded-xl"
      />

      <div>
        <InputField
          label="Role Name"
          name="roleName"
          type="text"
          size="xs"
          value={editFormData.roleName}
          onChange={handleEditChange}
          required
        />
      </div>

      <div>
        <InputField
          label="Total Questions"
          name="totalQuestions"
          type="text"
          size="xs"
          value={editFormData.totalQuestions}
          onChange={handleEditChange}
          placeholder="e.g., 120, 10k+, 3.5k"
        />
      </div>

      <FileInputField
        label="CSV File"
        name="csvFile"
        accept=".csv"
        imagePreview={false}
        fileName={editFormData.csvFileName}
        onChange={(file, e) => handleCsvChange(e)}
        triggerText="Browse"
      />

      <div className="flex justify-end space-x-1 pt-1">
        <button
          onClick={handleEditCancel}
          className="flex cursor-pointer items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-700 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all duration-200 hover:shadow"
        >
          <X size={14} />
          <span>Cancel</span>
        </button>

        <button
          onClick={() => handleEditSave(role._id)}
          disabled={saveLoading}
          className="flex cursor-pointer items-center space-x-1 px-2 py-1.5 text-xs font-medium text-white bg-linear-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saveLoading ? (
            <ThreeDots
              height="20"
              width="20"
              color="#FFFFFF"
              secondaryColor="#E2E8F0"
              strokeWidth={4}
              strokeWidthSecondary={4}
            />
          ) : (
            <Save size={14} />
          )}
          <span>{!saveLoading && "Save"}</span>
        </button>
      </div>
    </div>
  );
};

export default EditRoleQuestionForm;
