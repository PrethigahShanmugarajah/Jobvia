// Jobvia / Admin / src / pages / ListJobs Components / JobCardInfoList.jsx

const JobCardInfoList = ({ title, Icon, items }) => {
  return (
    <div>
      <h4 className="font-semibold text-slate-800 mb-1 flex items-center gap-1">
        <Icon size={14} className="text-indigo-500 shrink-0" />
        {title}
      </h4>

      <ul className="list-disc list-inside text-slate-600 space-y-0.5">
        {items?.map((item, index) => (
          <li key={index} className="truncate">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobCardInfoList;
