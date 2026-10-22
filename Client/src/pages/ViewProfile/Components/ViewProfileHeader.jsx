// Jobvia / Client / src / pages / ViewProfile / Components / ViewProfileHeader.jsx
import "../Styles/ViewProfile.css";
import { Edit3, Save, X } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const ViewProfileHeader = ({
  isEditing,
  setIsEditing,
  handleCancel,
  handleSave,
  isSaving,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 animate-fade-in-down gap-4">
      <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        My Profile
      </h1>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="group w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <Edit3 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Edit Profile
        </button>
      ) : (
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            onClick={handleCancel}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-all duration-300 w-full sm:w-auto"
          >
            <X className="w-5 h-5" />
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto ${
              isSaving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSaving ? (
              <>
                <ThreeDots
                  height="20"
                  width="20"
                  radius="9"
                  color="#FFFFFF"
                  secondaryColor="#E2E8F0"
                  ariaLabel="saving"
                  visible={true}
                />
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewProfileHeader;
