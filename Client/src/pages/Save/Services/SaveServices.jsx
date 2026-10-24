import {
  fetchInterviewCompanies,
  fetchInterviewRoles,
  fetchSavedJobs,
  fetchUserProfile,
} from "../../../services/fetch";
import {
  applyForJob,
  toggleSaveInterviewQuestion,
  toggleSaveJob,
  toggleSaveRoleQuestion,
} from "../../../services/mutations";
import { toast } from "react-toastify";

/* -------- Fetch Saved Items -------- */
export const fetchSavedItemsService = async (
  STORAGE_KEY,
  STORAGE_JOBS_KEY,
  STORAGE_QUESTIONS_KEY,
  setLoading,
  setSavedItems,
  setRoles,
  setCompaniesState,
) => {
  setLoading(true);

  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) return;

    const [savedData, rolesData, companiesData] = await Promise.all([
      fetchSavedJobs(),
      fetchInterviewRoles(),
      fetchInterviewCompanies(),
    ]);

    if (rolesData.success) setRoles(rolesData.roles);
    if (companiesData.success) setCompaniesState(companiesData.companies);

    if (savedData.success) {
      setSavedItems({
        jobs: savedData.savedJobs,
        interviewQuestions: savedData.savedInterviewQuestions,
        roleQuestions: savedData.savedRoleQuestions,
      });

      localStorage.setItem(
        STORAGE_JOBS_KEY,
        JSON.stringify(savedData.savedJobs.map((job) => job._id)),
      );

      const questionIds = [
        ...savedData.savedInterviewQuestions.map(
          (question) => `company:${question._id}`,
        ),
        ...savedData.savedRoleQuestions.map(
          (question) => `role:${question._id}`,
        ),
      ];

      localStorage.setItem(STORAGE_QUESTIONS_KEY, JSON.stringify(questionIds));
    }
  } catch {
    //
  } finally {
    setLoading(false);
  }
};

/* -------- Toggle Save Interview Question -------- */
export const toggleSaveService = async (
  rawId,
  STORAGE_KEY,
  fetchSavedItems,
) => {
  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) return;

    const [kind, id] = rawId.includes(":")
      ? rawId.split(":")
      : ["interview", rawId];

    const data =
      kind === "role"
        ? await toggleSaveRoleQuestion(id)
        : await toggleSaveInterviewQuestion(id);

    if (data?.success) {
      await fetchSavedItems();
    }
  } catch {
    //
  }
};

/* -------- Toggle Save Job -------- */
export const handleToggleSaveJobService = async (jobId, fetchSavedItems) => {
  try {
    const data = await toggleSaveJob(jobId);

    if (data?.success) {
      await fetchSavedItems();
    }
  } catch (error) {
    console.error("Error toggling job save:", error);
  }
};

/* -------- Check Profile Before Applying -------- */
export const openConfirmPopupService = async (
  job,
  appliedJobs,
  STORAGE_KEY,
  setConfirmPopup,
) => {
  if (!job || appliedJobs.includes(String(job.id))) return;

  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) {
      toast.error("Please log in to apply for this job.");
      return;
    }

    const data = await fetchUserProfile();

    if (data.success && (!data.user.phone || !data.user.resume)) {
      toast.error(
        "Please complete your profile by adding your phone number and resume before applying.",
      );
      return;
    }

    setConfirmPopup({
      open: true,
      jobId: String(job.id),
      role: job.role,
      company: job.company,
    });
  } catch {
    setConfirmPopup({
      open: true,
      jobId: String(job.id),
      role: job.role,
      company: job.company,
    });
  }
};

/* -------- Apply for Job -------- */
export const confirmApplyService = async (
  jobId,
  applying,
  STORAGE_KEY,
  setApplying,
  applyJobOnce,
  closeConfirmPopup,
) => {
  if (!jobId || applying) return;

  try {
    const rawUser = localStorage.getItem(STORAGE_KEY);
    const token = rawUser ? JSON.parse(rawUser).token : null;

    if (!token) {
      toast.error("Please log in to apply for this job.");
      return;
    }

    setApplying(true);

    const data = await applyForJob(jobId);

    if (
      data?.success ||
      data?.message === "You have already applied for this job"
    ) {
      applyJobOnce(jobId);
      closeConfirmPopup();
    }
  } finally {
    setApplying(false);
  }
};
