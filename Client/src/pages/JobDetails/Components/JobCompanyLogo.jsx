import { useState } from "react";

const JobCompanyLogo = ({ job, BASE_URL }) => {
  const [imageError, setImageError] = useState(false);

  const logoUrl = job?.logo;
  const isValidLogo = logoUrl && logoUrl !== BASE_URL && !imageError;
  const initials = job?.company?.charAt(0)?.toUpperCase() || "?";

  if (!isValidLogo) {
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-purple-700 text-2xl font-bold text-white">
        {initials}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${job?.company || "Company"} logo`}
      className="h-16 w-16 shrink-0 rounded-xl border border-gray-200 bg-white object-contain p-1"
      onError={() => setImageError(true)}
    />
  );
};

export default JobCompanyLogo;
