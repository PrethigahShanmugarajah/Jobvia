import { fetchInterviewCompanies } from "../../../services/fetch";
import {
  deleteInterviewCompany,
  updateInterviewCompany,
} from "../../../services/mutations";
import { parseCSVText } from "../../../utils/companyQuestions";
import { toast } from "react-toastify";

/* -------- Fetch companies -------- */
export const fetchCompanyQuestionsService = async (
  setCompanies,
  setLoading,
) => {
  try {
    setLoading(true);

    const data = await fetchInterviewCompanies();

    if (data?.success) {
      setCompanies(data.companies);
    }
  } catch (error) {
    console.error("Fetch Interview Companies Error:", error);
  } finally {
    setLoading(false);
  }
};

/* -------- Delete company -------- */
export const deleteCompanyQuestionService = async (
  deleteConfirmation,
  setCompanies,
  setDeleteConfirmation,
) => {
  if (!deleteConfirmation) {
    return;
  }

  const data = await deleteInterviewCompany(deleteConfirmation.id);

  if (data?.success) {
    setCompanies((prev) =>
      prev.filter(
        (company) => (company._id || company.id) !== deleteConfirmation.id,
      ),
    );

    setDeleteConfirmation(null);
  }

  return data;
};

/* -------- Update company -------- */
export const updateCompanyQuestionService = async (
  editingCompany,
  formData,
  setCompanies,
  setIsEditModalOpen,
  setEditingCompany,
  setFormData,
) => {
  const formDataToSend = new FormData();

  formDataToSend.append("companyName", formData.name);
  formDataToSend.append("questionsCount", formData.totalQuestions);
  formDataToSend.append("csvFileName", formData.csvFileName);

  if (formData.imageFile) {
    formDataToSend.append("logoFile", formData.imageFile);
  }

  if (formData.csvFile) {
    formDataToSend.append("csvFile", formData.csvFile);

    const text = await formData.csvFile.text();
    const rows = parseCSVText(text);

    if (rows && rows.length > 1) {
      const headers = rows[0].map((h) => (h || "").toString().toLowerCase());

      const qIdx = headers.findIndex((h) => h.includes("question"));
      const aIdx = headers.findIndex((h) => h.includes("answer"));
      const kIdx = headers.findIndex((h) => h.includes("key"));

      const questions = [];

      for (let i = 1; i < rows.length; i++) {
        const vals = rows[i];

        if (!vals.some((v) => (v || "").trim() !== "")) {
          continue;
        }

        const question = (vals[qIdx >= 0 ? qIdx : 0] || "").toString().trim();

        if (!question) {
          continue;
        }

        questions.push({
          question,
          answer: vals[aIdx >= 0 ? aIdx : 1] || "",
          keyPoints: (vals[kIdx >= 0 ? kIdx : 2] || "")
            .split(/(?:;|\||\r?\n)+/)
            .map((k) => k.trim())
            .filter((k) => k !== ""),
        });
      }

      formDataToSend.append("questionsData", JSON.stringify(questions));
    }
  }

  const data = await updateInterviewCompany(editingCompany._id, formDataToSend);

  if (data?.success) {
    setCompanies((prev) =>
      prev.map((company) =>
        company._id === editingCompany._id ? data.company : company,
      ),
    );

    setIsEditModalOpen(false);
    setEditingCompany(null);

    setFormData({
      name: "",
      totalQuestions: "",
      imageFile: null,
      imagePreview: "",
      csvFile: null,
      csvFileName: "",
      parsedQuestions: [],
    });
  }

  return data;
};

/* -------- Format question count -------- */
export const formatToCompactService = (val) => {
  if (val == null) {
    return "";
  }

  const trimmed = String(val).trim();

  if (
    /^\d{1,3}(?:,\d{3})*(?:\.\d+)?$/.test(trimmed) ||
    /^\d+(\.\d+)?$/.test(trimmed)
  ) {
    const num = Number(trimmed.replace(/,/g, ""));

    if (!Number.isFinite(num)) {
      return trimmed;
    }

    if (num >= 1000) {
      const k = Math.floor(num / 1000);
      return `${k}k+`;
    }

    return String(num);
  }

  return trimmed;
};

/* -------- Handle image upload -------- */
export const handleImageUploadService = (e, formData, setFormData) => {
  const file = e.target.files?.[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith("image/")) {
    return { error: "Please upload an image file" };
  }

  if (formData.imagePreview && formData.imageFile) {
    URL.revokeObjectURL(formData.imagePreview);
  }

  const objectUrl = URL.createObjectURL(file);

  setFormData((prev) => ({
    ...prev,
    imageFile: file,
    imagePreview: objectUrl,
  }));
};

/* -------- Handle CSV upload -------- */
export const handleCsvUploadService = (e, setFormData) => {
  const file = e.target.files?.[0];

  if (!file) {
    return;
  }

  if (!file.name.toLowerCase().endsWith(".csv")) {
    return { error: "Please upload a CSV file" };
  }

  setFormData((prev) => ({
    ...prev,
    csvFile: file,
    csvFileName: file.name,
    parsedQuestions: [],
  }));

  const reader = new FileReader();

  reader.onload = (event) => {
    const rows = parseCSVText(event.target.result);

    if (!rows || rows.length <= 1) {
      setFormData((prev) => ({
        ...prev,
        parsedQuestions: [],
      }));
      return;
    }

    const headers = rows[0].map((h) => (h || "").toString().toLowerCase());

    const questionIdx = headers.findIndex((h) => h.includes("question"));
    const answerIdx = headers.findIndex((h) => h.includes("answer"));
    const keyPointsIdx = headers.findIndex((h) => h.includes("key"));

    const questions = [];

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];

      if (!values.some((v) => (v || "").toString().trim() !== "")) {
        continue;
      }

      const question = (values[questionIdx >= 0 ? questionIdx : 0] || "")
        .toString()
        .trim();

      if (!question) {
        continue;
      }

      questions.push({
        question,
        answer: values[answerIdx >= 0 ? answerIdx : 1] || "",
        keyPoints: (values[keyPointsIdx >= 0 ? keyPointsIdx : 2] || "")
          .split(/(?:;|\||\r?\n)+/)
          .map((k) => k.trim())
          .filter((k) => k !== ""),
      });
    }

    setFormData((prev) => ({
      ...prev,
      parsedQuestions: questions,
    }));
  };

  reader.onerror = () => {
    setFormData((prev) => ({
      ...prev,
      parsedQuestions: [],
    }));
    toast.error("Unable to read the CSV file");
  };

  reader.readAsText(file);
};

/* -------- Handle image removal -------- */
export const handleRemoveImageService = (formData, setFormData) => {
  if (formData.imagePreview && formData.imageFile) {
    URL.revokeObjectURL(formData.imagePreview);
  }

  setFormData((p) => ({ ...p, imageFile: null, imagePreview: "" }));
};

/* -------- Handle CSV removal -------- */
export const handleRemoveCsvService = (setFormData) => {
  setFormData((p) => ({
    ...p,
    csvFile: null,
    csvFileName: "",
    parsedQuestions: [],
  }));
};
