import { logoColors } from "../constants/logoColors";

const CompanyLogo = ({ job, imgErrors, BASE_URL, handleImgError }) => {
  const logoUrl = job.logo;
  const isBroken = imgErrors[job.id] || !logoUrl || logoUrl === BASE_URL;

  const initials = job.company?.charAt(0) || "?";

  const colorClass =
    logoColors[job.company?.length % logoColors.length] || logoColors[0];

  return (
    <div
      className={`w-full h-full flex items-center justify-center overflow-hidden relative text-white rounded-2xl shadow-lg font-bold text-2xl ${!isBroken && logoUrl ? "" : colorClass}`}
    >
      {!isBroken && logoUrl ? (
        <img
          src={logoUrl}
          alt={`${job.company} logo`}
          className="w-full h-full object-contain relative z-10"
          onError={() => handleImgError(job.id)}
        />
      ) : (
        <span className="relative z-0">{initials}</span>
      )}
    </div>
  );
};

export default CompanyLogo;
