import "../Styles/JobDetails.css";
import { getJobInfo } from "../Data/jobInfo";

const JobInfoList = ({ job, CURRENCY }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
      {getJobInfo(job, CURRENCY).map((item, index) => (
        <div
          key={index}
          className="job-info-item flex items-center gap-3 animate-fade-in"
        >
          <div
            className={`p-2 sm:p-3 rounded-lg ${
              index === 0
                ? "bg-blue-50"
                : index === 1
                  ? "bg-purple-50"
                  : index === 2
                    ? "bg-green-50"
                    : index === 3
                      ? "bg-orange-50"
                      : "bg-pink-50"
            }`}
          >
            {item.icon ? (
              <item.icon
                className={`w-5 h-5 ${
                  index === 0
                    ? "text-blue-600"
                    : index === 1
                      ? "text-purple-600"
                      : index === 2
                        ? "text-green-600"
                        : index === 3
                          ? "text-orange-600"
                          : "text-pink-600"
                }`}
              />
            ) : (
              <span className="text-green-600 font-bold text-lg">
                {CURRENCY}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <div className="text-xs text-gray-500">{item.label}</div>

            <span
              className={`job-info-value inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-bold wrap-break-word border ${
                item.customClass ||
                item.colorFn?.(item.value) ||
                "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobInfoList;
