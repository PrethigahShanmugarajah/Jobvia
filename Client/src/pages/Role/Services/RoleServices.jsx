// Jobvia / Client / src / pages / Role / Services / RoleServices.jsx
import {
  fetchInterviewQuestionsByRole,
  fetchInterviewRoles,
  fetchSavedJobs,
} from "../../../services/fetch";
import { slugify } from "../../../utils/slugify";
import { toast } from "react-toastify";
import { toggleSaveRoleQuestion } from "../../../services/mutations";
import { toggleSavedId } from "../../Company/Utils/savedQuestion";

/* -------- Fetch Interview Roles -------- */
export const loadRolesService = async (
  location,
  params,
  setRoles,
  setSelectedRoleId,
  setLoadingQuestions,
  setLoadingRoles,
) => {
  try {
    const data = await fetchInterviewRoles();

    if (data.success && data.roles) {
      setRoles(data.roles);

      const roleSlugFromUrl = params.roleSlug;
      const roleSlugFromState = location?.state?.selectedRoleSlug;

      const initialRole =
        data.roles.find(
          (role) =>
            role._id === roleSlugFromState ||
            slugify(role.roleName) === roleSlugFromState ||
            role._id === roleSlugFromUrl ||
            slugify(role.roleName) === roleSlugFromUrl,
        ) || data.roles[0];

      if (initialRole) {
        setSelectedRoleId(initialRole._id);
      } else {
        setLoadingQuestions(false);
      }
    } else {
      setLoadingQuestions(false);
    }
  } catch {
    setLoadingQuestions(false);
  } finally {
    setLoadingRoles(false);
  }
};

/* -------- Fetch Interview Questions By Role -------- */
export const loadQuestionsService = async (
  selectedRoleId,
  setLoadingQuestions,
  setQuestions,
) => {
  if (!selectedRoleId) {
    return;
  }

  setLoadingQuestions(true);

  try {
    const data = await fetchInterviewQuestionsByRole(selectedRoleId);

    if (data.success) {
      setQuestions(data.questions);
    }
  } finally {
    setLoadingQuestions(false);
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
        ...(data.savedInterviewQuestions || []).map(
          (question) => `company:${question._id}`,
        ),
        ...(data.savedRoleQuestions || []).map(
          (question) => `role:${question._id}`,
        ),
      ];

      setSavedIds(qIds);
      localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(qIds));
    }
  } catch {
    //
  }
};

/* -------- Toggle Save Role Question -------- */
export const toggleSaveQuestionService = async (
  id,
  openSaved,
  selectedRoleId,
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

    const data = await toggleSaveRoleQuestion(id);

    if (data?.success) {
      const ns = `role:${id}`;

      setSavedIds((prev) => {
        const next = toggleSavedId(prev, ns);

        localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(next));

        return next;
      });

      if (openSaved) {
        navigate("/saved", {
          state: {
            filterType: "role",
            id: selectedRoleId,
            focusRaw: ns,
          },
        });
      }
    }
  } catch {
    //
  }
};
