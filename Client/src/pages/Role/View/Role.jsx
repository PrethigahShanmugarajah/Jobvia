// Jobvia / Client / src / pages / Role / View / Role.jsx
import "../Styles/Role.css";
import { useAppContext } from "../../../context/appContext";
import { useEffect, useState } from "react";
import {
  fetchSavedIdsService,
  loadQuestionsService,
  loadRolesService,
  toggleSaveQuestionService,
} from "../Services/RoleServices";
import RoleHeader from "../Components/RoleHeader";
import RoleSelector from "../Components/RoleSelector";
import { ThreeCircles } from "react-loader-spinner";
import EmptyQuestions from "../Components/EmptyQuestions";
import RoleQuestionCard from "../../../components/RoleQuestionCard";

const Role = () => {
  const { navigate, location, params, STORAGE_QUESTIONS_KEY } = useAppContext();

  const [roles, setRoles] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  const [selectedRoleId, setSelectedRoleId] = useState(null);

  const [savedIds, setSavedIds] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_QUESTIONS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const loadRoles = async () => {
      await loadRolesService(
        location,
        params,
        setRoles,
        setSelectedRoleId,
        setLoadingQuestions,
        setLoadingRoles,
      );
    };

    loadRoles();
  }, [location, params]);

  useEffect(() => {
    loadQuestionsService(selectedRoleId, setLoadingQuestions, setQuestions);
  }, [selectedRoleId]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === STORAGE_QUESTIONS_KEY) {
        try {
          setSavedIds(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setSavedIds([]);
        }
      }
    };

    window.addEventListener("storage", handler);

    fetchSavedIdsService(STORAGE_QUESTIONS_KEY, setSavedIds);

    return () => window.removeEventListener("storage", handler);
  }, [STORAGE_QUESTIONS_KEY]);

  const toggleSave = async (id, openSaved = false) => {
    await toggleSaveQuestionService(
      id,
      openSaved,
      selectedRoleId,
      STORAGE_QUESTIONS_KEY,
      setSavedIds,
      navigate,
    );
  };

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-indigo-50/50 via-white to-purple-50/50">
      <div className="mx-auto max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <RoleHeader />

        <RoleSelector
          loadingRoles={loadingRoles}
          roles={roles}
          selectedRoleId={selectedRoleId}
          setSelectedRoleId={setSelectedRoleId}
        />

        {loadingQuestions ? (
          <div className="flex justify-center w-full py-12">
            <ThreeCircles
              visible={true}
              height="50"
              width="50"
              color="#4F46E5"
              ariaLabel="loading questions"
            />
          </div>
        ) : questions.length === 0 ? (
          <EmptyQuestions />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((q, index) => (
              <RoleQuestionCard
                key={q._id}
                questionNumber={index + 1}
                question={q.question.replace(/^\d+\.\s*/, "")}
                isSaved={savedIds.includes(`role:${q._id}`)}
                onToggleSave={() => toggleSave(q._id)}
                answer={q.answer}
                keyPoints={q.keyPoints || []}
                isImportant={q.isImportant}
                askedBy={Array.isArray(q.askedBy) ? q.askedBy : []}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Role;
