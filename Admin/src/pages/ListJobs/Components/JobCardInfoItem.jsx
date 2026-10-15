// Jobvia / Admin / src / pages / ListJobs Components / JobCardInfoItem.jsx

const JobCardInfoItem = ({ Icon, children }) => {
  return (
    <div className="flex items-center gap-1.5 text-slate-600">
      <Icon size={14} className="text-slate-400 shrink-0" />

      <span className="truncate">{children}</span>
    </div>
  );
};

export default JobCardInfoItem;
