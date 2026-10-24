import "../Styles/InterviewQuestion.css";
import { useState } from "react";
import { getColorClass } from "../Constants/interviewQuestion";
import { Link } from "react-router-dom";
import { CircleArrowOutUpRight } from "lucide-react";

const CompanyCard = ({ company }) => {
  const [imgError, setImgError] = useState(false);

  const initials = company.companyName
    ? company.companyName
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
    : "??";

  const colorClass = getColorClass("company", company.companyName);

  return (
    <Link
      to={`/companies/${company._id}`}
      state={{ companyId: company._id }}
      className="group relative block rounded-2xl overflow-visible"
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-25 blur transition-opacity duration-300 pointer-events-none"></div>

      <article className="relative bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-lg transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`card-logo flex items-center justify-center rounded-lg overflow-hidden w-14 h-14 ${colorClass}`}
            >
              {!imgError && company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.companyName} logo`}
                  className="max-w-full max-h-full object-contain p-1"
                  onError={() => setImgError(true)}
                />
              ) : (
                <span className="font-semibold text-sm">{initials}</span>
              )}
            </div>

            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                {company.companyName}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {company.questionsCount || "0"} Interviews
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <CircleArrowOutUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CompanyCard;
