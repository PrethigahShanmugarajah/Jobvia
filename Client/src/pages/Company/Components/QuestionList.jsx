// Jobvia / Client / src / pages / Company / Components / QuestionList.jsx
import "../Styles/Company.css";
import {
  Bookmark,
  Calendar,
  ChevronDown,
  ChevronUp,
  CircleDashed,
  Lightbulb,
} from "lucide-react";
import { formatDate } from "../Utils/date";

const QuestionList = ({
  questionsToShow,
  savedIds,
  toggleSave,
  filteredAndSortedQuestions,
  showAllQuestions,
  setShowAllQuestions,
  VISIBLE_COUNT,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {questionsToShow.map((question, index) => {
          const isSaved = savedIds.includes(`company:${question._id}`);
          const main = question.answer;
          const points = question.keyPoints || [];

          return (
            <div
              key={question._id}
              className="question-card bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 relative"
            >
              <button
                onClick={() => toggleSave(question._id)}
                className={`absolute cursor-pointer top-4 right-4 z-20 p-2 rounded-lg transition-all ${
                  isSaved
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-white text-gray-600"
                }`}
                aria-label={isSaved ? "Unsave question" : "Save question"}
              >
                <Bookmark className="w-5 h-5" />
              </button>

              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar className="w-3 h-3" />
                        {formatDate(question.postDate)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3 wrap-break-word">
                      {index + 1}. {question.question.replace(/^\d+\.\s*/, "")}
                    </h3>
                  </div>
                </div>

                <div className="rounded-xl p-5 border border-transparent bg-linear-to-r from-gray-50 to-blue-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-bold text-gray-700">
                      Recommended Answer
                    </h4>
                  </div>

                  {main && (
                    <p className="text-gray-700 leading-relaxed mb-3 whitespace-pre-wrap wrap-break-word break-all sm:break-normal">
                      {main}
                    </p>
                  )}

                  {points && points.length > 0 && (
                    <ul className="text-gray-700 mt-3 space-y-2">
                      {points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CircleDashed className="w-4 h-4 text-gray-900 mt-0.5 shrink-0" />
                          <span className="wrap-break-word">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAndSortedQuestions.length > VISIBLE_COUNT && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAllQuestions((show) => !show)}
            className="btn-3d inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-white font-medium transform transition-transform will-change-transform"
          >
            {showAllQuestions ? (
              <>
                <ChevronUp className="w-5 h-5" /> Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-5 h-5" /> Show All{" "}
                {filteredAndSortedQuestions.length} Questions
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default QuestionList;
