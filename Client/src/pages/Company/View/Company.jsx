import "../Styles/Company.css";
import { useAppContext } from "../../../context/appContext";
import { useEffect, useState } from "react";
import { getStoredSavedIds, parseSavedIds } from "../Utils/savedQuestion";
import {
  fetchSavedIdsService,
  loadCompaniesService,
  loadQuestionsService,
  toggleSaveQuestionService,
} from "../Services/CompanyServices";
import { Building2, ChevronDown, ChevronUp } from "lucide-react";
import CompanyList from "../Components/CompanyList";
import { ThreeCircles } from "react-loader-spinner";
import EmptyQuestions from "../Components/EmptyQuestions";
import CompanyQuestionCard from "../../../components/CompanyQuestionCard";
import { formatDate } from "../Utils/date";

const Company = () => {
  const { navigate, location, params, STORAGE_QUESTIONS_KEY } = useAppContext();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [selectedCompanyData, setSelectedCompanyData] = useState(null);

  const [savedIds, setSavedIds] = useState(() =>
    getStoredSavedIds(STORAGE_QUESTIONS_KEY),
  );

  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const VISIBLE_COUNT = 10;

  useEffect(() => {
    loadCompaniesService(
      location,
      params,
      selectedCompany,
      setCompanies,
      setSelectedCompany,
    );
  }, [
    location,
    location?.state?.companyId,
    params,
    params.companyId,
    selectedCompany,
  ]);

  useEffect(() => {
    fetchSavedIdsService(STORAGE_QUESTIONS_KEY, setSavedIds);
  }, [STORAGE_QUESTIONS_KEY]);

  useEffect(() => {
    loadQuestionsService(
      selectedCompany,
      setLoading,
      setInterviewQuestions,
      setSelectedCompanyData,
    );
  }, [selectedCompany]);

  const toggleSave = (id, openSaved = false) =>
    toggleSaveQuestionService(
      id,
      openSaved,
      selectedCompany,
      STORAGE_QUESTIONS_KEY,
      setSavedIds,
      navigate,
    );

  useEffect(() => {
    const handler = (e) => {
      if (e.key === STORAGE_QUESTIONS_KEY) {
        setSavedIds(parseSavedIds(e.newValue));
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [STORAGE_QUESTIONS_KEY]);

  const filteredAndSortedQuestions = interviewQuestions;

  const questionsToShow = showAllQuestions
    ? filteredAndSortedQuestions
    : filteredAndSortedQuestions.slice(0, VISIBLE_COUNT);

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-gray-50 to-blue-50 p-6 md:p-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-8 h-8 text-blue-600" />

              <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Company Interview Hub
              </h1>
            </div>
          </div>
        </div>

        <CompanyList
          companies={companies}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          setShowAllQuestions={setShowAllQuestions}
        />

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 wrap-break-word">
            {selectedCompanyData
              ? `${selectedCompanyData.companyName} Interview Questions`
              : "Interview Questions"}

            <span className="text-gray-500 text-lg ml-2">
              ({filteredAndSortedQuestions.length} Interview Questions)
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#4F46E5"
              ariaLabel="three-circles-loading"
            />
          </div>
        ) : filteredAndSortedQuestions.length === 0 ? (
          <EmptyQuestions />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {questionsToShow.map((question, index) => {
                const isSaved = savedIds.includes(`company:${question._id}`);

                return (
                  <CompanyQuestionCard
                    key={question._id}
                    questionNumber={index + 1}
                    question={question.question.replace(/^\d+\.\s*/, "")}
                    date={question.postDate}
                    formatDate={formatDate}
                    isSaved={isSaved}
                    onToggleSave={() => toggleSave(question._id)}
                    answer={question.answer}
                    keyPoints={question.keyPoints || []}
                  />
                );
              })}
            </div>

            {filteredAndSortedQuestions.length > VISIBLE_COUNT && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setShowAllQuestions((show) => !show)}
                  className="btn-3d inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-white font-medium transform transition-transform will-change-transform"
                >
                  {showAllQuestions ? (
                    <>
                      <ChevronUp className="w-5 h-5" /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5" /> Show All{" "}
                      {filteredAndSortedQuestions.length} Questions
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Company;
