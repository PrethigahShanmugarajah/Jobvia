// Jobvia / Client / src / components / RoleQuestionCard.jsx
import { Award, Bookmark, Building2, CheckCircle2, Dot } from "lucide-react";

const RoleQuestionCard = ({
  questionNumber,
  question,
  isSaved = false,
  onToggleSave,
  answer,
  keyPoints = [],
  roleName,
  isImportant = false,
  askedBy = [],
  formatAskedDate,
  variant = "default",
  idx = 0,
}) => {
  const isSavedVariant = variant === "saved";

  return (
    <div
      className={`relative rounded-2xl bg-white/80 p-4 sm:p-6 shadow-lg hover:shadow-2xl transition ${
        isSavedVariant ? `animate-fadeIn animate-delay-${Math.min(idx, 9)}` : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggleSave}
        className={`absolute cursor-pointer right-3 top-3 p-2 rounded-lg ${
          isSaved ? "bg-purple-600 text-white" : "text-purple-600"
        }`}
        title={isSaved ? "Unsave" : "Save"}
        aria-label={isSaved ? "Unsave question" : "Save question"}
      >
        <Bookmark className="h-5 w-5" />
      </button>

      {isImportant && (
        <div className="absolute -top-3 left-4 bg-linear-to-r from-amber-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full shadow">
          <Award className="h-3 w-3 inline mr-1" />
          Most Asked
        </div>
      )}

      <h3 className="text-lg sm:text-xl font-bold mb-3 pr-8 wrap-break-word">
        {questionNumber != null && `${questionNumber}. `}
        {question}
      </h3>

      {roleName && (
        <div className="text-sm text-gray-600 mb-3">
          Role: <span className="font-medium">{roleName}</span>
        </div>
      )}

      <div className="mb-4 bg-indigo-50 p-3 rounded-xl border-l-4 border-indigo-400 text-sm whitespace-pre-wrap wrap-break-word">
        <span className="font-semibold text-indigo-800">Answer: </span>
        {answer}
      </div>

      {keyPoints.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 mb-2">
            KEY POINTS
          </div>

          <div className="flex flex-wrap gap-2">
            {keyPoints.map((point, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-gray-100"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                {point}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
          <Building2 className="h-3.5 w-3.5" />
          Asked in
        </div>

        <div className="flex flex-wrap gap-2">
          {askedBy.length > 0 ? (
            askedBy.map((company, index) => {
              const name = company?.companyName || "Unknown";
              const date = company?.dateAsked;

              return (
                <div
                  key={index}
                  className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg text-xs"
                >
                  <span className="font-medium">{name}</span>

                  {date && (
                    <>
                      <Dot className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-gray-500">
                        {formatAskedDate ? formatAskedDate(date) : date}
                      </span>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <span className="text-xs text-gray-400">No company data</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleQuestionCard;
