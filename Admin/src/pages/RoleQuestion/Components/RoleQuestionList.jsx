// Jobvia / Admin / src / pages / RoleQuestion / Components / RoleQuestionList.jsx
import { Briefcase, Calendar } from "lucide-react";
import { formatDate } from "../../../utils/roleQuestion";

const RoleQuestionList = ({ questions }) => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Loaded Questions ({questions.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="card-animation group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-5 border border-gray-200 hover:border-indigo-200 relative overflow-hidden"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-300 via-indigo-500 to-indigo-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="absolute top-3 right-3 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
              #{q.id}
            </div>

            <div className="pr-12 mb-3">
              <p className="font-medium text-gray-800 line-clamp-2">
                {q.question}
              </p>
            </div>

            <div className="mt-2 bg-indigo-50/70 p-3 rounded-lg text-sm text-gray-700 border-l-2 border-indigo-300 whitespace-pre-wrap">
              {q.answer}
            </div>

            {(q.keyPoints || []).length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(q.keyPoints || []).map((kp, i) => (
                  <span
                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium"
                    key={i}
                  >
                    {kp}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 text-xs text-gray-500 font-medium flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5" />
              Asked in
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {(q.companies || []).length > 0 ? (
                (q.companies || []).map((c, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 px-2 py-1.5 rounded-lg text-xs border border-gray-200 flex items-center gap-1 hover:border-indigo-300 transition-colors"
                  >
                    <Briefcase className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span className="font-medium text-gray-700">{c.name}</span>

                    {c.date && (
                      <>
                        <span className="text-gray-300 mx-0.5">.</span>
                        <Calendar className="w-3 h-3 text-gray-400 shrink-0" />
                        <span className="text-gray-500">
                          {formatDate(c.date)}
                        </span>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <span className="text-gray-400 italic text-xs">
                  No company data
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleQuestionList;
