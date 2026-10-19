// Jobvia / Admin / src / pages / CompanyQuestion / View / CompanyQuestion.jsx
import "./CompanyQuestion.css";
import { useState } from "react";
import {
  submitCompanyQuestionService,
  validateCompanyQuestionFormService,
} from "../Services/CompanyQuestionServices";
import { parseCountString } from "../../../utils/companyQuestions";
import PageHeader from "../../../components/PageHeader";
import { Building2 } from "lucide-react";
import CompanyQuestionForm from "../Components/CompanyQuestionForm";
import UploadedQuestions from "../Components/UploadedQuestions";

const CompanyQuestion = () => {
  const [companyName, setCompanyName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [questionsCount, setQuestionsCount] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [parsedQuestions, setParsedQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    return validateCompanyQuestionFormService(
      companyName,
      questionsCount,
      csvFile,
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await submitCompanyQuestionService(
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
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const parsedCountForDisplay =
    parseCountString(questionsCount) || parsedQuestions.length;

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-blue-50 via-white to-indigo-50 p-6 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title="Company Interview Questions"
          description="Add company and upload a question bank CSV (Question, Answer, KeyPoints, PostDate optional)."
          Icon={Building2}
        />

        <CompanyQuestionForm
          handleSubmit={handleSubmit}
          companyName={companyName}
          setCompanyName={setCompanyName}
          questionsCount={questionsCount}
          setQuestionsCount={setQuestionsCount}
          parsedCountForDisplay={parsedCountForDisplay}
          logoPreview={logoPreview}
          setLogoFile={setLogoFile}
          setLogoPreview={setLogoPreview}
          csvFile={csvFile}
          setCsvFile={setCsvFile}
          parsedQuestions={parsedQuestions}
          setParsedQuestions={setParsedQuestions}
          isSubmitting={isSubmitting}
        />

        {/* -------- Display Parsed Questions -------- */}
        {parsedQuestions.length > 0 && (
          <UploadedQuestions parsedQuestions={parsedQuestions} />
        )}
      </div>
    </div>
  );
};

export default CompanyQuestion;
