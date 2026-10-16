// Jobvia / Admin / src / pages / Companies / Services / CompaniesServices.jsx
import { fetchCompanies } from "../../../services/fetch";
import { createCompany, deleteCompany } from "../../../services/mutations";

/* -------- Load companies -------- */
export const fetchCompaniesService = async () => {
  const data = await fetchCompanies();
  return data.companies || [];
};

/* -------- Handle logo change -------- */
export const handleLogoChangeService = (
  e,
  setLogoFile,
  setLogoPreview,
  fileInputRef,
) => {
  const file = e.target.files[0];

  if (file) {
    setLogoFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setLogoPreview(reader.result);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    reader.onerror = () => {
      console.error("FileReader Error:", reader.error);
    };

    reader.readAsDataURL(file);
  } else {
    setLogoFile(null);
    setLogoPreview("");
  }
};

/* -------- Validate company form -------- */
export const validateCompanyFormService = (logoFile, website) => {
  const newErrors = {};

  if (!logoFile) {
    newErrors.logo = "Logo is required";
  }

  if (!website.trim()) {
    newErrors.website = "Website URL is required";
  } else if (!/^https?:\/\/.+\..+/.test(website)) {
    newErrors.website = "Enter a valid URL (e.g., https://example.com)";
  }

  return Object.keys(newErrors).length === 0;
};

/* -------- Submit company -------- */
export const submitCompanyService = async (
  logoFile,
  website,
  setCompanies,
  setLogoFile,
  setLogoPreview,
  setWebsite,
) => {
  const formData = new FormData();

  formData.append("logo", logoFile);
  formData.append("website", website.trim());

  const data = await createCompany(formData);

  setCompanies((prev) => [data.company, ...prev]);

  setLogoFile(null);
  setLogoPreview("");
  setWebsite("");

  return data;
};

/* -------- Delete company -------- */
export const deleteCompanyService = async (
  selectedCompanyId,
  setCompanies,
  setSelectedCompanyId,
) => {
  if (!selectedCompanyId) {
    return;
  }

  await deleteCompany(selectedCompanyId);

  setCompanies((prev) =>
    prev.filter((company) => company._id !== selectedCompanyId),
  );

  setSelectedCompanyId(null);
};
