import { fetchInterviewRoles } from "../../../services/fetch";
import {
  deleteRoleQuestion,
  updateRoleQuestion,
} from "../../../services/mutations";
import {
  findHeaderKey,
  parseCompanyEntry,
  parseCSV,
  splitMulti,
  uniquePairs,
  uniqueStrings,
} from "../../../utils/listRoleQuestion";

/* -------- Fetch roles -------- */
export const fetchRolesService = async (setRoles, setLoading) => {
  try {
    setLoading(true);
    const response = await fetchInterviewRoles();

    if (response?.success) {
      setRoles(response.roles);
    }

    return response;
  } finally {
    setLoading(false);
  }
};

/* -------- Update role -------- */
export const updateRoleQuestionService = async (id, editFormData) => {
  const formData = new FormData();

  formData.append("roleName", editFormData.roleName);
  formData.append("questionsCount", editFormData.totalQuestions);
  formData.append("csvFileName", editFormData.csvFileName);

  if (editFormData.imageFile) {
    formData.append("imageFile", editFormData.imageFile);
  }

  if (editFormData.csvFile) {
    formData.append("csvFile", editFormData.csvFile);
  }

  if (editFormData.questionsData) {
    formData.append(
      "questionsData",
      JSON.stringify(editFormData.questionsData),
    );
  }

  return await updateRoleQuestion(id, formData);
};

/* -------- Delete role -------- */
export const deleteRoleQuestionService = async (
  id,
  setRoles,
  setDeleteRole,
  setDeleteLoading,
) => {
  try {
    setDeleteLoading(true);

    const response = await deleteRoleQuestion(id);

    if (response?.success) {
      setRoles((prev) => prev.filter((role) => role._id !== id));
      setDeleteRole(null);
    }

    return response;
  } finally {
    setDeleteLoading(false);
  }
};

/* -------- Parse CSV questions -------- */
export const parseRoleQuestionsCSVService = (csvText) => {
  const { headers, data } = parseCSV(csvText);

  if (!data || data.length === 0) {
    return [];
  }

  const qKey = findHeaderKey(headers, ["question", "q", "prompt"]);
  const aKey = findHeaderKey(headers, ["answer", "ans", "response"]);
  const kpKey = findHeaderKey(headers, [
    "keypoints",
    "key_points",
    "key_point",
  ]);
  const companyKey = findHeaderKey(headers, [
    "company",
    "companies",
    "employer",
  ]);
  const dateKey = findHeaderKey(headers, ["date", "asked_date", "post_date"]);

  const map = new Map();

  data.forEach((rowObj) => {
    const rawQuestion =
      (qKey && rowObj[qKey]) || Object.values(rowObj)[0] || "";
    const question = (rawQuestion || "").toString().trim();

    if (!question) return;

    const answer = (aKey && rowObj[aKey]) || "";
    const keypointsCell = (kpKey && rowObj[kpKey]) || "";
    const companyCell = (companyKey && rowObj[companyKey]) || "";
    const dateCell = (dateKey && rowObj[dateKey]) || "";

    const keypoints = uniqueStrings(splitMulti(keypointsCell));
    const pairs = [];
    const compEntries = splitMulti(companyCell);
    const dateEntries = splitMulti(dateCell);

    if (compEntries.length > 0) {
      const max = Math.max(compEntries.length, dateEntries.length);

      for (let i = 0; i < max; i++) {
        const comp = compEntries[i]
          ? parseCompanyEntry(compEntries[i]).name
          : "N/A";
        const dt = dateEntries[i] || dateEntries[0] || "";

        pairs.push({ name: comp, date: dt });
      }
    }

    const key = question.toLowerCase();

    if (!map.has(key)) {
      map.set(key, {
        question,
        answer: answer.toString().trim(),
        keyPoints: keypoints,
        companies: pairs,
      });
    } else {
      const existing = map.get(key);
      existing.keyPoints = uniqueStrings([...existing.keyPoints, ...keypoints]);
      existing.companies = uniquePairs([...existing.companies, ...pairs]);
      map.set(key, existing);
    }
  });

  return Array.from(map.values());
};
