import { useEffect, useState } from "react";
import {
  fetchInterviewCompanies,
  fetchInterviewRoles,
} from "../../../services/fetch";

/* -------- Interview Question Service -------- */
export const useInterviewQuestionService = () => {
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -------- Fetch Interview Data -------- */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesData, rolesData] = await Promise.all([
          fetchInterviewCompanies(),
          fetchInterviewRoles(),
        ]);

        if (companiesData.success) {
          setCompanies(companiesData.companies.slice(0, 8));
        }

        if (rolesData.success) {
          setRoles(rolesData.roles.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    companies,
    roles,
    loading,
  };
};
