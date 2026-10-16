// Jobvia / Admin / src / pages / ListJobs Components / SectionHeader.jsx

const SectionHeader = ({ icon, title, className = "mb-4" }) => {
  return (
    <h4
      className={`text-sm font-semibold text-slate-700 ${className} flex items-center gap-2`}
    >
      {icon}
      {title}
    </h4>
  );
};

export default SectionHeader;
