// Jobvia / Admin / src / pages / Dashboard / Components / DashboardHeader.jsx
import { TrendingUp } from "lucide-react";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10 animate-fadeIn">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Jobvia Dashboard
        </h1>

        <p className="text-slate-500 mt-2 flex items-center gap-2 text-sm sm:text-sm">
          <TrendingUp className="w-4 h-4 text-emerald-500" />

          <span>Real-time overview of jobs and applicants</span>
        </p>
      </div>
    </div>
  );
};

export default DashboardHeader;
