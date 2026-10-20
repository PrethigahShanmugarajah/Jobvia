// Jobvia / Client / src / pages / Home / Components / FeaturedJobCard.jsx
import "../Styles/Banner.css";
import LottieLogo from "./LottieLogo";

const FeaturedJobCard = ({ job, lottieSize, CURRENCY }) => {
  return (
    <div className="group relative bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center overflow-hidden">
            {typeof job.logo === "string" && job.logo.startsWith("http") ? (
              <div className="w-full h-full p-1 flex items-center justify-center">
                <LottieLogo src={job.logo} size={lottieSize} />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg text-white">
                <span className="text-lg font-bold">
                  {job.logo?.charAt(0) || "?"}
                </span>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
              {job.title}
            </h4>

            <p className="text-xs sm:text-sm text-gray-500">{job.company}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="font-bold text-gray-800">{job.salary(CURRENCY)}</div>

          <div className="text-xs text-gray-500">per year</div>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 rounded-xl transition-all duration-300"></div>
    </div>
  );
};

export default FeaturedJobCard;
