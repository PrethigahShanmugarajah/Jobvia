// Jobvia / Admin / src / pages / RoleQuestion / Services / RoleQuestionServices.jsx
import { toast } from "react-toastify";
import {
  parseCompanyEntry,
  parseCSV,
  splitMulti,
  uniquePairs,
  uniqueStrings,
} from "../../../utils/roleQuestion";
import { addRoleQuestion } from "../../../services/mutations";

/* -------- Handle image upload -------- */
export const handleImageChangeService = (e, setImagePreview) => {
  const file = e.target.files?.[0];

  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  } else {
    toast.error("Please upload a valid image file.");
  }
};

/* -------- Find CSV header -------- */
export const findHeaderKeyService = (headers, variants) => {
  for (const variant of variants) {
    const key = variant.toLowerCase().replace(/\s+/g, "_");
    const index = headers.indexOf(key);

    if (index !== -1) return headers[index];
  }

  for (const header of headers) {
    for (const variant of variants) {
      if ((header || "").includes(variant.toLowerCase().replace(/\s+/g, "_"))) {
        return header;
      }
    }
  }

  return null;
};

/* -------- Handle CSV upload -------- */
export const handleCSVUploadService = (
  e,
  setCsvFile,
  setQuestions,
  setIsUploading,
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setCsvFile(file);
  setIsUploading(true);

  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const { headers, data } = parseCSV(event.target.result);

      if (!data || data.length === 0) {
        toast.error("CSV is empty or malformed");
        return;
      }

      const qKey = findHeaderKeyService(headers, [
        "question",
        "q",
        "prompt",
        "title",
      ]);

      const aKey = findHeaderKeyService(headers, [
        "answer",
        "ans",
        "response",
        "solution",
      ]);

      const kpKey = findHeaderKeyService(headers, [
        "keypoints",
        "key_points",
        "key_point",
        "points",
        "highlights",
      ]);

      const companyKey = findHeaderKeyService(headers, [
        "company",
        "companies",
        "employer",
        "company_name",
      ]);

      const dateKey = findHeaderKeyService(headers, [
        "date",
        "asked_date",
        "posted",
        "post_date",
      ]);

      const questionMap = new Map();

      data.forEach((row) => {
        const rawQuestion = (qKey && row[qKey]) || Object.values(row)[0] || "";
        const question = String(rawQuestion).trim();

        if (!question) return;

        const answer = (aKey && row[aKey]) || "";
        const keypointsCell = (kpKey && row[kpKey]) || "";
        const companyCell = (companyKey && row[companyKey]) || "";
        const dateCell = (dateKey && row[dateKey]) || "";

        const keyPoints = uniqueStrings(splitMulti(keypointsCell));
        const companyEntries = splitMulti(companyCell);
        const dateEntries = splitMulti(dateCell);

        const parsedCompanies = companyEntries.map((company) =>
          parseCompanyEntry(company),
        );

        const hasParsedDates = parsedCompanies.some((company) => company.date);

        let companies = [];

        if (companyEntries.length > 0 && hasParsedDates) {
          companies = parsedCompanies.map((company) => ({
            name: company.name || "",
            date: company.date || "",
          }));
        } else if (companyEntries.length > 0 && dateEntries.length > 0) {
          const max = Math.max(companyEntries.length, dateEntries.length);

          for (let i = 0; i < max; i++) {
            const company = companyEntries[i]
              ? parseCompanyEntry(companyEntries[i]).name
              : "N/A";

            const date = dateEntries[i] || dateEntries[0] || "";

            companies.push({ name: company, date });
          }
        } else if (companyEntries.length > 0) {
          companies = parsedCompanies.map((company) => ({
            name: company.name || "",
            date: company.date || "",
          }));
        } else if (dateEntries.length > 0) {
          companies = dateEntries.map((date) => ({
            name: "N/A",
            date,
          }));
        }

        const key = question.toLowerCase();

        if (!questionMap.has(key)) {
          questionMap.set(key, {
            question,
            answer: String(answer).trim(),
            keyPoints: [...keyPoints],
            companies: [...companies],
          });
        } else {
          const existing = questionMap.get(key);

          if (
            String(answer).trim().length >
            String(existing.answer || "").trim().length
          ) {
            existing.answer = String(answer).trim();
          }

          existing.keyPoints = uniqueStrings([
            ...existing.keyPoints,
            ...keyPoints,
          ]);

          existing.companies = uniquePairs([
            ...existing.companies,
            ...companies,
          ]);
        }
      });

      const aggregated = Array.from(questionMap.values()).map(
        (item, index) => ({
          id: index + 1,
          ...item,
          companies: uniquePairs(item.companies || []),
          keyPoints: uniqueStrings(item.keyPoints || []),
        }),
      );

      aggregated.sort(
        (a, b) => (b.companies?.length || 0) - (a.companies?.length || 0),
      );

      setQuestions(aggregated);

      if (aggregated.length === 0) {
        toast.error("No valid questions found in the CSV.");
      }
    } catch (error) {
      console.error("CSV parse error:", error);
      toast.error("Failed to parse CSV. Check the formatting and headers.");
    } finally {
      setIsUploading(false);
    }
  };

  reader.onerror = () => {
    toast.error("Error reading file");
    setIsUploading(false);
  };

  reader.readAsText(file, "utf-8");
};

/* -------- Submit role questions -------- */
export const submitRoleQuestionService = async (
  roleName,
  totalQuestions,
  csvFile,
  imageFile,
  questions,
  resetForm,
  setIsUploading,
) => {
  try {
    setIsUploading(true);

    const formDataToSend = new FormData();

    formDataToSend.append("roleName", roleName);
    formDataToSend.append("questionsCount", totalQuestions);

    if (csvFile) {
      formDataToSend.append("csvFile", csvFile);
      formDataToSend.append("csvFileName", csvFile.name);
    }

    if (imageFile instanceof File) {
      formDataToSend.append("imageFile", imageFile);
    }

    formDataToSend.append("questionsData", JSON.stringify(questions));

    const response = await addRoleQuestion(formDataToSend);

    if (response?.success) {
      resetForm();
    }

    return response;
  } finally {
    setIsUploading(false);
  }
};
