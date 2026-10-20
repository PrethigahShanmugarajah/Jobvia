// Jobvia / Client / src / pages / Home / Services / CareerServices.jsx
import { useEffect, useState } from "react";
import { fetchCompanies } from "../../../services/fetch";

export const useCareerService = () => {
  const [companies, setCompanies] = useState([]);

  /* -------- Fetch Companies -------- */
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data.companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    loadCompanies();
  }, []);

  const duplicatedCompanies = [...companies, ...companies];

  const placeholder = (name) =>
    `https://via.placeholder.com/560x320?text=${encodeURIComponent(
      (name || "Co").split(" ")[0].slice(0, 2).toUpperCase(),
    )}`;

  const isExternal = (url) => /^https?:\/\//i.test(url);

  return {
    duplicatedCompanies,
    placeholder,
    isExternal,
  };
};
