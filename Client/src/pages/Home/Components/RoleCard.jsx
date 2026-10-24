import "../Styles/InterviewQuestion.css";
import { useState } from "react";
import { getColorClass } from "../Constants/interviewQuestion";
import { slugify } from "../../../utils/slugify";
import { Link } from "react-router-dom";
import { CircleArrowOutUpRight } from "lucide-react";

const RoleCard = ({ role }) => {
  const [imgError, setImgError] = useState(false);

  const initials = role.roleName
    ? role.roleName
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
    : "??";

  const colorClass = getColorClass("role", role.roleName);
  const slug = slugify(role.roleName);

  return (
    <Link
      to={`/roles/${slug}`}
      state={{ selectedRoleSlug: slug }}
      className="group relative block rounded-2xl overflow-visible"
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300 pointer-events-none"></div>

      <article className="relative bg-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-lg transform transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`card-logo flex items-center justify-center rounded-lg overflow-hidden w-14 h-14 ${colorClass}`}
            >
              {!imgError && role.image ? (
                <img
                  src={role.image}
                  alt={`${role.roleName} logo`}
                  onError={() => setImgError(true)}
                  className="max-w-full max-h-full object-contain p-1"
                />
              ) : (
                <span className="font-semibold text-sm">{initials}</span>
              )}
            </div>

            <div>
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">
                {role.roleName}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {role.questionsCount || "0"} Questions
              </p>
            </div>
          </div>

          <div>
            <CircleArrowOutUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RoleCard;
