import { Briefcase, Building, Users } from "lucide-react";
import { statColors } from "../../../constants/statColors";
import { ThreeDots } from "react-loader-spinner";

const DashboardStats = ({ dashboardStats, loading }) => {
  const stats = [
    {
      label: "Total Jobs",
      value: dashboardStats.totalJobs,
      icon: Briefcase,
      colors: statColors.blue,
    },
    {
      label: "Closed Jobs",
      value: dashboardStats.closedJobs,
      icon: Briefcase,
      colors: statColors.rose,
    },
    {
      label: "Total Applicants",
      value: dashboardStats.totalApplicants,
      icon: Users,
      colors: statColors.emerald,
    },
    {
      label: "Active Companies",
      value: dashboardStats.totalCompanies,
      icon: Building,
      colors: statColors.amber,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 sm:mb-12">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="group relative bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] border border-slate-100/80 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>

            <div className="relative p-4 sm:p-6 md:p-8 flex items-center justify-between">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>

                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
                  {loading ? (
                    <ThreeDots
                      height="24"
                      width="36"
                      radius="4"
                      color="#3B82F6"
                      ariaLabel="loading"
                      visible={true}
                    />
                  ) : (
                    stat.value
                  )}
                </p>
              </div>

              <div
                className={`p-3 sm:p-4 md:p-4 rounded-3xl shadow-lg transform transition-transform duration-300 ${stat.colors.bgLight} bg-linear-to-br ${stat.colors.gradient}`}
              >
                <Icon
                  className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                  strokeWidth={1.8}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
