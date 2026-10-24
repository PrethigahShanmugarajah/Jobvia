import { CircleDashed, Download, HelpCircle, Lightbulb } from "lucide-react";
import { formatDatePretty } from "../../../utils/companyQuestions";

const UploadedQuestions = ({ parsedQuestions }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Download size={20} className="text-indigo-600" /> Uploaded Questions (
        {parsedQuestions.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {parsedQuestions.map((q, idx) => (
          <div
            key={idx}
            className="group p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-indigo-200 animate-card"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex gap-3">
              <div className="shrink-0 text-indigo-500 mt-0.5">
                <HelpCircle size={20} />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-slate-800 group-hover:text-indigo-700 transition-colors">
                    {q.question || (
                      <span className="text-slate-400">No question text</span>
                    )}
                  </p>

                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {formatDatePretty(q.postDate)}
                  </span>
                </div>

                <div className="mt-2 text-sm text-slate-600">
                  <div className="font-medium mb-1 flex items-center gap-1">
                    <Lightbulb size={14} className="text-amber-500" />
                    Answer
                  </div>

                  <div className="prose-sm max-w-none text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {q.answer || (
                      <span className="text-slate-400">NO answer provided</span>
                    )}
                  </div>
                </div>

                {q.keyPoints && q.keyPoints.length > 0 && (
                  <div className="mt-3">
                    <div className="text-xs font-semibold text-amber-700 mb-1 flex items-center gap-1">
                      <CircleDashed size={12} /> Key Points
                    </div>

                    <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                      {q.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2">
                          <CircleDashed
                            size={14}
                            className="mt-0.5 text-gray-900 shrink-0"
                          />

                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedQuestions;
