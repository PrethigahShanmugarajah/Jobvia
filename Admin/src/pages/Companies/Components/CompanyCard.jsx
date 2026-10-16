// Jobvia / Admin / src / pages / Companies / Components / CompanyCard.jsx
import { Trash2 } from "lucide-react";

const CompanyCard = ({ company, setSelectedCompanyId }) => {
  return (
    <div
      key={company._id}
      className="relative bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/40 shadow-sm flex flex-col items-start gap-3"
    >
      {/* -------- Logo -------- */}
      <div className="w-full flex items-center justify-center mb-2">
        <div className="w-16 h-16 sm:w-20 md:w-24 rounded-md overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
          {company.logo ? (
            <img
              src={company.logo}
              alt="Logo"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-slate-400">No Image</div>
          )}
        </div>
      </div>

      <div className="flex-1 w-full">
        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-700 font-medium hover:underline wrap-break-word"
        >
          {company.website}
        </a>
      </div>

      <div className="w-full flex justify-end">
        <button
          onClick={() => setSelectedCompanyId(company._id)}
          className="text-red-500 cursor-pointer hover:text-red-600 p-2 rounded-md"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
