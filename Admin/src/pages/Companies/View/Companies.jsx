// Jobvia / Admin / src / pages / Companies / View / Companies.jsx
import "./Companies.css";
import { useEffect, useState } from "react";
import {
  deleteCompanyService,
  fetchCompaniesService,
  submitCompanyService,
  validateCompanyFormService,
} from "../Services/CompaniesServices";
import PageHeader from "../../../components/PageHeader";
import { Building2 } from "lucide-react";
import CompanyForm from "../Components/CompanyForm";
import CompanyCard from "../Components/CompanyCard";
import ConfirmPopup from "../../../components/ConfirmPopup";

const Companies = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [website, setWebsite] = useState("");
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const companies = await fetchCompaniesService();
        setCompanies(companies);
      } catch (error) {
        console.error("Load Companies Error:", error);
      }
    };

    loadCompanies();
  }, []);

  const validateForm = () => {
    return validateCompanyFormService(logoFile, website);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await submitCompanyService(
        logoFile,
        website,
        setCompanies,
        setLogoFile,
        setWebsite,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCompany = async () => {
    if (!selectedCompanyId) {
      return;
    }

    setIsLoading(true);

    try {
      await deleteCompanyService(
        selectedCompanyId,
        setCompanies,
        setSelectedCompanyId,
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-indigo-50 via-white to-purple-50 p-6 sm:p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader
          title="Add Company"
          description="Upload a company logo and provide its website URL"
          Icon={Building2}
        />

        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6 sm:p-6 md:p-8">
          <CompanyForm
            handleSubmit={handleSubmit}
            logoFile={logoFile}
            setLogoFile={setLogoFile}
            website={website}
            setWebsite={setWebsite}
            isLoading={isLoading}
          />
        </div>

        {/* -------- Company List -------- */}
        {companies.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Companies</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {companies.map((c) => (
                <CompanyCard
                  key={c._id}
                  company={c}
                  setSelectedCompanyId={setSelectedCompanyId}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedCompanyId && (
        <ConfirmPopup
          title="Delete Company"
          children={
            <>
              Are you sure you want to delete{" "}
              <b>
                {companies.find((c) => c._id === selectedCompanyId)?.website}
              </b>{" "}
              This action cannot be undone.
            </>
          }
          confirmText="Delete"
          closeText="Cancel"
          loading={isLoading}
          onClose={() => setSelectedCompanyId(null)}
          onConfirm={handleDeleteCompany}
        />
      )}
    </div>
  );
};

export default Companies;
