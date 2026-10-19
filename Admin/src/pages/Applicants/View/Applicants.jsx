// Jobvia / Admin / src / pages / Applicants / View / Applicants.jsx
import "./Applicants.css";
import { useAppContext } from "../../../context/appContext";
import { useEffect, useState } from "react";
import {
  fetchApplicantsService,
  getApplicantResumeUrlService,
} from "../Services/ApplicantsServices";
import { ArrowLeft, Users } from "lucide-react";
import CompanyBadge from "../Components/CompanyBadge";
import { ThreeCircles } from "react-loader-spinner";
import NoApplicants from "../Components/NoApplicants";
import ApplicantCard from "../Components/ApplicantCard";

const Applicants = () => {
  const { navigate, location } = useAppContext();

  const { jobId, role, companyName } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const loadApplicants = async () => {
      try {
        const applicants = await fetchApplicantsService(
          jobId,
          role,
          setLoading,
        );

        setFiltered(applicants);
      } catch {
        setFiltered([]);
      }
    };

    loadApplicants();
  }, [jobId, role]);

  const handleViewResume = (resumeUrl, userId) => {
    const fullUrl = getApplicantResumeUrlService(resumeUrl, userId);

    if (!fullUrl) {
      return;
    }

    const link = document.createElement("a");
    link.href = fullUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-full font-[pacifico] bg-linear-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 pt-8 sm:pt-10 md:pt-12">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-25 lg:top-30 xl:left-15 left-4 p-2 sm:p-3 rounded-full bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5 text-indigo-600" />
      </button>

      <div className="max-w-7xl pt-10 mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center mb-3 sm:mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold bg-linear-to-r from-indigo-800 to-purple-800 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
            <Users className="w-6 mb-7 md:mb-0 lg:mb-0 xl:mb-0 h-6 sm:w-7 sm:h-7 text-indigo-600" />
            <span className="leading-tight">
              {role ? `${role} - Applicants` : "All"}
            </span>
          </h1>
        </div>

        {companyName && <CompanyBadge companyName={companyName} />}

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 border border-white/50 shadow-xl">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <ThreeCircles
                visible={true}
                height="50"
                width="50"
                color="#2563EB"
                ariaLabel="three-circles-loading"
              />
            </div>
          ) : filtered.length === 0 ? (
            <NoApplicants />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-6">
              {filtered.map((app, index) => (
                <ApplicantCard
                  key={app.id}
                  app={app}
                  index={index}
                  onViewResume={handleViewResume}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;
