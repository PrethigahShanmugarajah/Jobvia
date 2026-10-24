const CompanyBadge = ({ companyName }) => {
  return (
    <div className="flex justify-center mb-8 sm:mb-10">
      <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
        <span className="text-lg sm:text-2xl font-semibold text-indigo-600">
          {companyName}
        </span>

        <span className="flex items-center gap-1 text-xs sm:text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          active
        </span>
      </div>
    </div>
  );
};

export default CompanyBadge;
