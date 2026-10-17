// Jobvia / Admin / src / pages / CompanyQuestion / Services / CompanyQuestionServices.jsx
import {
  parseCountString,
  parseCSVText,
} from "../../../utils/companyQuestions";
import { createInterview } from "../../../services/mutations";

/* -------- Handle Logo Change -------- */
export const handleLogoChangeService = (e, setLogoFile, setLogoPreview) => {
  const file = e.target.files[0];

  if (file) {
    setLogoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);
  } else {
    setLogoFile(null);
    setLogoPreview("");
  }
};

/* -------- Handle CSV Change -------- */
export const handleCsvChangeService = (e, setCsvFile, setParsedQuestions) => {
  const file = e.target.files[0];

  if (!file) {
    return;
  }

  setCsvFile(file);

  const reader = new FileReader();

  reader.onload = (event) => {
    const text = event.target.result;
    const rows = parseCSVText(text);

    if (!rows || rows.length === 0) {
      setParsedQuestions([]);
      return;
    }

    const headers = rows[0].map((h) => (h || "").toString().toLowerCase());

    const questionIdx = headers.findIndex((h) => h.includes("question"));
    const answerIdx = headers.findIndex((h) => h.includes("answer"));

    const keyPointsIdx =
      headers.findIndex((h) => h.includes("key")) >= 0
        ? headers.findIndex((h) => h.includes("key"))
        : headers.findIndex((h) => h.includes("keypoints"));

    const postDateIdx =
      headers.findIndex((h) => h.includes("postdate")) >= 0
        ? headers.findIndex((h) => h.includes("postdate"))
        : headers.findIndex((h) => h.includes("date")) >= 0
          ? headers.findIndex((h) => h.includes("date"))
          : headers.findIndex((h) => h.includes("posted"));

    const fallbackQuestionIdx = questionIdx >= 0 ? questionIdx : 0;

    const fallbackAnswerIdx =
      answerIdx >= 0 ? answerIdx : fallbackQuestionIdx === 0 ? 1 : 0;

    const fallbackKeyPointsIdx =
      keyPointsIdx >= 0
        ? keyPointsIdx
        : Math.max(0, Math.min(rows[0].length - 1, fallbackAnswerIdx + 1));

    const defaultDate = file.lastModified
      ? new Date(file.lastModified)
      : new Date();

    const questions = [];

    for (let i = 1; i < rows.length; i++) {
      const values = rows[i];

      if (!values.some((v) => (v || "").toString().trim() !== "")) {
        continue;
      }

      const question = values[questionIdx] ?? values[fallbackQuestionIdx] ?? "";

      const answer = values[answerIdx] ?? values[fallbackAnswerIdx] ?? "";

      const keyRaw = values[keyPointsIdx] ?? values[fallbackKeyPointsIdx] ?? "";

      const postRaw =
        (postDateIdx >= 0 ? values[postDateIdx] : undefined) ?? "";

      const finalPostDate = postRaw.split(/[;|\n]/)[0]?.trim();

      const postDateValue = finalPostDate
        ? finalPostDate
        : defaultDate.toISOString();

      const keyPoints = (keyRaw || "")
        .split(/(?:;|\||\r?\n)+/)
        .map((k) => k.trim())
        .filter((k) => k !== "");

      questions.push({
        question: question || "",
        answer: answer || "",
        keyPoints,
        postDate: postDateValue,
      });
    }

    setParsedQuestions(questions);
  };

  reader.readAsText(file);
};

/* -------- Validate Company Question Form -------- */
export const validateCompanyQuestionFormService = (
  companyName,
  questionsCount,
  csvFile,
) => {
  const newErrors = {};

  if (!companyName.trim()) {
    newErrors.companyName = "Company name is required";
  }

  const parsedCount = parseCountString(questionsCount);

  if (!questionsCount.trim() || isNaN(parsedCount) || parsedCount <= 0) {
    newErrors.questionsCount =
      "Enter a valid number of questions (e.g., 1600, 10k+)";
  }

  if (!csvFile) {
    newErrors.csvFile = "CSV file is required";
  }

  return Object.keys(newErrors).length === 0;
};

/* -------- Submit Company Questions -------- */
export const submitCompanyQuestionService = async (
  companyName,
  logoFile,
  questionsCount,
  csvFile,
  parsedQuestions,
  setCompanyName,
  setLogoFile,
  setLogoPreview,
  setQuestionsCount,
  setCsvFile,
  setParsedQuestions,
  logoInputId = "logo-upload",
  csvInputId = "csv-upload",
) => {
  const formDataToSend = new FormData();

  formDataToSend.append("companyName", companyName);
  formDataToSend.append("questionsCount", questionsCount);

  if (logoFile) {
    formDataToSend.append("logoFile", logoFile);
  }

  if (csvFile) {
    formDataToSend.append("csvFile", csvFile);
    formDataToSend.append("csvFileName", csvFile.name);
  }

  formDataToSend.append("questionsData", JSON.stringify(parsedQuestions));

  const response = await createInterview(formDataToSend);

  if (response?.success) {
    setCompanyName("");
    setLogoFile(null);
    setLogoPreview("");
    setQuestionsCount("");
    setCsvFile(null);
    setParsedQuestions([]);

    const logoEl = document.getElementById(logoInputId);
    const csvEl = document.getElementById(csvInputId);

    if (logoEl) {
      logoEl.value = "";
    }

    if (csvEl) {
      csvEl.value = "";
    }
  }

  return response;
};
