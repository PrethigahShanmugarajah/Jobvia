// Jobvia / Client / src / pages / Company / Services / CompanyServices.jsx
import {
  fetchInterviewCompanies,
  fetchInterviewQuestionsByCompany,
  fetchSavedJobs,
} from "../../../services/fetch";
import { getInitialCompanyId } from "../Utils/company";
import { toast } from "react-toastify";
import { toggleSaveInterviewQuestion } from "../../../services/mutations";
import { toggleSavedId } from "../Utils/savedQuestion";

/* -------- Fetch Interview Companies -------- */
export const loadCompaniesService = async (
  location,
  params,
  selectedCompany,
  setCompanies,
  setSelectedCompany,
) => {
  try {
    const response = await fetchInterviewCompanies();

    if (response.success) {
      setCompanies(response.companies);

      const initialCompany = getInitialCompanyId(
        location,
        params,
        response.companies,
      );

      if (initialCompany && !selectedCompany) {
        setSelectedCompany(initialCompany);
      }
    }
  } catch {
    //
  }
};

/* -------- Fetch Saved Question IDs -------- */
export const fetchSavedIdsService = async (
  STORAGE_QUESTIONS_KEY,
  setSavedIds,
) => {
  try {
    const data = await fetchSavedJobs();

    if (data?.success) {
      const qIds = [
        ...(data.savedInterviewQuestions || []).map((q) => `company:${q._id}`),
        ...(data.savedRoleQuestions || []).map((q) => `role:${q._id}`),
      ];

      setSavedIds(qIds);
      localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(qIds));
    }
  } catch {
    //
  }
};

/* -------- Fetch Interview Questions By Company -------- */
export const loadQuestionsService = async (
  selectedCompany,
  setLoading,
  setInterviewQuestions,
  setSelectedCompanyData,
) => {
  if (!selectedCompany) {
    return;
  }

  setLoading(true);

  try {
    const response = await fetchInterviewQuestionsByCompany(selectedCompany);

    if (response.success) {
      setInterviewQuestions(response.questions);
      setSelectedCompanyData(response.company);
    }
  } finally {
    setLoading(false);
  }
};

/* -------- Toggle Save Interview Question -------- */
export const toggleSaveQuestionService = async (
  id,
  openSaved,
  selectedCompany,
  STORAGE_QUESTIONS_KEY,
  setSavedIds,
  navigate,
) => {
  try {
    const rawUser = localStorage.getItem("jobvia_user");
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) {
      toast.error("Please log in to save this question.");
      return;
    }

    const data = await toggleSaveInterviewQuestion(id);

    if (data?.success) {
      const ns = `company:${id}`;

      setSavedIds((prev) => {
        const next = toggleSavedId(prev, ns);

        localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(next));

        return next;
      });

      if (openSaved) {
        navigate("/saved", {
          state: {
            filterType: "company",
            id: selectedCompany,
            focusRaw: `company:${id}`,
          },
        });
      }
    }
  } catch {
    //
  }
};
