// Jobvia / Admin / src / pages / ListJobs Components / Badge.jsx

const Field = ({ label, icon, children }) => {
  return (
    <div className="mb-2">
      <label className="block text-xs font-medium text-slate-500 mb-1 items-center gap-2">
        {icon} <span>{label}</span>
      </label>

      <div className="p-2 rounded-lg border border-transparent bg-white transition-shadow duration-200 ease-in-out focus-within:ring-1 focus-within:ring-indigo-300 focus-within:shadow-lg">
        {children}
      </div>
    </div>
  );
};

export default Field;
