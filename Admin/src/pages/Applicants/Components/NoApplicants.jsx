import { Users } from "lucide-react";

const NoApplicants = () => {
  return (
    <div className="text-center py-12 sm:py-16">
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-100 mb-4">
        <Users className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
      </div>

      <p className="text-lg sm:text-xl font-medium text-slate-700">
        No Applicants Found
      </p>

      <p className="text-sm text-slate-400 mt-2">
        Try going back or clear filters on the dashboard
      </p>
    </div>
  );
};

export default NoApplicants;
