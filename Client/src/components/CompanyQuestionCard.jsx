// Jobvia / Client / src / components / CompanyQuestionCard.jsx
import { Bookmark, Calendar, CircleDashed, Lightbulb } from "lucide-react";

const CompanyQuestionCard = ({
  questionNumber,
  question,
  date,
  isSaved,
  onToggleSave,
  answer,
  keyPoints = [],
  details,
  formatDate,
  variant = "default",
  idx = 0,
}) => {
  const isSavedVariant = variant === "saved";

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative ${
        isSavedVariant ? `animate-fadeIn animate-delay-${Math.min(idx, 9)}` : ""
      }`}
    >
      <button
        type="button"
        onClick={onToggleSave}
        className={`absolute cursor-pointer ${
          isSavedVariant ? "top-3 right-3" : "top-4 right-4"
        } z-20 p-2 rounded-lg transition-all ${
          isSaved
            ? "bg-purple-600 text-white shadow-md"
            : "bg-white text-purple-600"
        }`}
        aria-label={isSaved ? "Unsave question" : "Save question"}
      >
        <Bookmark className="w-5 h-5" />
      </button>

      <div
        className={
          isSavedVariant ? "p-4 sm:p-6 relative z-10" : "p-6 relative z-10"
        }
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div
              className={`flex items-center gap-2 text-gray-500 mb-3 ${
                isSavedVariant ? "text-xs" : "text-sm"
              }`}
            >
              <Calendar className="w-3 h-3" />
              {formatDate ? formatDate(date) : date}
            </div>

            <h3
              className={`font-bold text-gray-800 mb-3 wrap-break-word ${
                isSavedVariant ? "text-lg sm:text-xl" : "text-xl"
              }`}
            >
              {questionNumber != null && `${questionNumber}. `}
              {question}
            </h3>

            {details && (
              <div className="text-sm text-gray-600 mb-3">{details}</div>
            )}
          </div>
        </div>

        <div
          className={`rounded-xl border border-transparent bg-linear-to-r from-gray-50 to-blue-50 ${
            isSavedVariant ? "p-4 sm:p-5" : "p-5"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h4 className="font-bold text-gray-700">Recommended Answer</h4>
          </div>

          {answer && (
            <p className="text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap wrap-break-word">
              {answer}
            </p>
          )}

          {keyPoints.length > 0 && (
            <ul className="text-gray-700 mt-3 space-y-2">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CircleDashed className="w-4 h-4 text-gray-900 mt-0.5 shrink-0" />
                  <span className="wrap-break-word">{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyQuestionCard;
