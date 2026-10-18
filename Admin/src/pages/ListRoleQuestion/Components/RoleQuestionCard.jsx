// Jobvia / Admin / src / pages / ListRoleQuestion / Components / RoleQuestionCard.jsx
import { Image as ImageIcon, Edit2, Trash2, FileText } from "lucide-react";

const RoleQuestionCard = ({ role, handleEditStart, handleDeleteClick }) => {
  return (
    <div className="p-3 sm:p-4 bg-white rounded-xl relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-3">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden ring-2 ring-blue-200 shrink-0">
          {role.image ? (
            <img
              src={role.image}
              alt={role.roleName}
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-5 h-5 text-blue-500" />
          )}
        </div>
        <div className="flex-1 min-w-0 mt-2 sm:mt-0">
          <h3 className="text-sm font-semibold text-gray-800 truncate">
            {role.roleName}
          </h3>

          <p className="text-xs text-gray-500 flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-1"></span>
            {role.questionsCount} questions
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-1 text-xs text-gray-600 bg-linear-to-r from-gray-50 to-gray-100 p-1.5 rounded-lg truncate border border-gray-200">
        <FileText size={14} className="text-gray-400 shrink-0" />
        {role.csvFileUrl ? (
          <a
            href={role.csvFileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate text-blue-600 hover:underline"
            title="Download CSV"
          >
            {role.csvFileName || "Download CSV"}
          </a>
        ) : (
          <span className="truncate">{role.csvFileName || "No CSV"}</span>
        )}
      </div>

      <div className="flex justify-end space-x-1 mt-3">
        <button
          onClick={() => handleEditStart(role)}
          className="p-1.5 cursor-pointer text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200 hover:shadow-md transform hover:scale-110"
          title="Edit"
        >
          <Edit2 size={16} />
        </button>

        <button
          onClick={() => handleDeleteClick(role)}
          className="p-1.5 cursor-pointer text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 hover:shadow-md transform hover:scale-110"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default RoleQuestionCard;
