// Jobvia / Admin / src / pages / RoleQuestion / View / RoleQuestion.jsx
import "./RoleQuestion.css";
import { useRef, useState } from "react";
import { submitRoleQuestionService } from "../Services/RoleQuestionServices";
import RoleQuestionHeader from "../Components/RoleQuestionHeader";
import RoleQuestionForm from "../Components/RoleQuestionForm";
import RoleQuestionList from "../Components/RoleQuestionList";

const RoleQuestion = () => {
  const [roleName, setRoleName] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [csvFile, setCsvFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const imageInputRef = useRef(null);
  const csvInputRef = useRef(null);

  /* -------- Submit role questions -------- */
  const handleAddRoleQuestion = async () => {
    await submitRoleQuestionService(
      roleName,
      totalQuestions,
      csvFile,
      imageFile,
      questions,
      () => {
        setRoleName("");
        setTotalQuestions("");
        setImagePreview("");
        setImageFile(null);
        setCsvFile(null);
        setQuestions([]);

        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }

        if (csvInputRef.current) {
          csvInputRef.current.value = "";
        }
      },
      setIsUploading,
    );
  };

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-blue-50 to-indigo-50 p-6 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <RoleQuestionHeader />

        <RoleQuestionForm
          roleName={roleName}
          setRoleName={setRoleName}
          totalQuestions={totalQuestions}
          setTotalQuestions={setTotalQuestions}
          imagePreview={imagePreview}
          imageFile={imageFile}
          setImageFile={setImageFile}
          setImagePreview={setImagePreview}
          csvFile={csvFile}
          setCsvFile={setCsvFile}
          setQuestions={setQuestions}
          isUploading={isUploading}
          setIsUploading={setIsUploading}
          handleAddRoleQuestion={handleAddRoleQuestion}
        />

        {questions.length > 0 && <RoleQuestionList questions={questions} />}
      </div>
    </div>
  );
};

export default RoleQuestion;
