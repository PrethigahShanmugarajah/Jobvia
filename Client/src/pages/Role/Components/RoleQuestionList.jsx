// Jobvia / Client / src / pages / Role / Components / RoleQuestionList.jsx
import "../Styles/Role.css";
import { Bookmark, Building2, CheckCircle2, Dot } from "lucide-react";
import { timeAgo } from "../Utils/date";

const RoleQuestionList = ({ questions, savedIds, toggleSave }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {questions.map((q, index) => {
        const isSaved = savedIds.includes(`role:${q._id}`);

        return (
          <div
            key={q._id}
            className="relative rounded-2xl bg-white/80 p-4 sm:p-6 shadow-lg hover:shadow-2xl transition"
          >
            {/* --------  Save Button -------- */}
            <button
              onClick={() => toggleSave(q._id)}
              className={`absolute cursor-pointer right-3 top-3 p-2 rounded-lg${
                isSaved ? "bg-purple-600 text-white" : "bg-white"
              }`}
              title={isSaved ? "Unsave" : "Save"}
            >
              <Bookmark
                className={`h-5 w-5 ${isSaved ? "fill-black text-black" : "fill-none text-black"}`}
              />
            </button>

            {/* --------  Question -------- */}
            <h3 className="text-lg sm:text-xl font-bold mb-3 pr-8 wrap-break-word">
              {index + 1}. {q.question.replace(/^\d+\.\s*/, "")}
            </h3>

            {/* --------  Answer -------- */}
            <div className="mb-3 bg-indigo-50 p-3 rounded-xl border-l-4 border-indigo-400 text-sm sm:text-sm">
              <span className="font-semibold text-indigo-800">Answer: </span>
              {q.answer}
            </div>

            {/* --------  Key Points -------- */}
            {q.keyPoints && q.keyPoints.length > 0 && (
              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-500 mb-2">
                  KEY POINTS
                </div>

                <div className="flex flex-wrap gap-2">
                  {q.keyPoints.map((point, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* --------  ASKED AT SECTION -------- */}
            <div>
              <div className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                Asked in
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.isArray(q.askedBy) && q.askedBy.length > 0 ? (
                  q.askedBy.map((item, idx) => {
                    const name = item?.companyName || "Unknown";
                    const date = item?.dateAsked;

                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg text-xs"
                      >
                        <span className="font-medium">{name}</span>

                        {date && (
                          <>
                            <Dot className="h-3.5 w-3.5 text-gray-400" />
                            <span className="text-gray-500">
                              {date.includes("-") || date.includes("/")
                                ? timeAgo(date)
                                : date}
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
      })}
    </div>
  );
};

export default RoleQuestionList;
