const JobRequirements = ({ title, items, sectionClass }) => {
  if (!items || (Array.isArray(items) && items.length === 0)) {
    return null;
  }

  return (
    <div className={`${sectionClass} mb-6 animate-fade-in`}>
      <h2 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wider">
        {title}
      </h2>

      {Array.isArray(items) ? (
        <ul className="list-disc list-inside text-gray-600 space-y-1 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="hover:translate-x-1 transition-transform wrap-break-word cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100 wrap-break-word">
          {items}
        </p>
      )}
    </div>
  );
};

export default JobRequirements;
