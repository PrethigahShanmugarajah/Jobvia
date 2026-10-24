import { CompanyPlaceholder } from "../../../assets/assets";
import { FileText, Pencil, Trash2, Image as ImageIcon } from "lucide-react";

const CompanyQuestionCard = ({ company, handleEdit, handleDelete }) => {
  const imgSrc = company.logo || company._objectUrl || company.imageUrl || "";

  return (
    <article
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 overflow-hidden flex flex-col relative"
      role="article"
      aria-labelledby={`company-${company._id || company.id}-title`}
    >
      <div className="h-36 sm:h-40 md:h-48 lg:h-48 bg-linear-to-r from-blue-50 to-indigo-50 overflow-hidden flex items-center justify-center">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={company.companyName || company.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = CompanyPlaceholder;
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <ImageIcon size={48} />
          </div>
        )}

        <div className="absolute right-3 top-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleEdit(company)}
            className="p-2 cursor-pointer bg-white rounded-full shadow-sm hover:bg-blue-50"
            title={`Edit ${company.companyName || company.name}`}
          >
            <Pencil size={16} className="text-blue-600" />
          </button>

          <button
            onClick={() =>
              handleDelete(
                company._id || company.id,
                company.companyName || company.name,
              )
            }
            className="p-2 cursor-pointer bg-white rounded-full shadow-sm hover:bg-red-50"
            title={`Delete ${company.companyName || company.name}`}
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      {/* -------- Content -------- */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h2
            id={`company-${company._id || company.id}-title`}
            className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1"
          >
            {company.companyName || company.name}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">Total Questions</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                {company.questionsCount || company.totalQuestions}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FileText size={14} className="text-green-600" />
              {company.csvFileUrl ? (
                <a
                  href={company.csvFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-xs text-blue-600 hover:underline"
                  title="Download CSV"
                >
                  {company.csvFileName || "Download CSV"}
                </a>
              ) : (
                <span className="truncate text-xs">
                  {company.csvFileName || "No CSV"}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-500"></div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit(company)}
              className="px-3 cursor-pointer py-1 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDelete(
                  company._id || company.id,
                  company.companyName || company.name,
                )
              }
              className="px-3 cursor-pointer py-1 text-sm border border-gray-200 rounded-full hover:bg-gray-50 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CompanyQuestionCard;
