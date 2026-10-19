// Jobvia / Admin / src / pages / ListRoleQuestion / View / ListRoleQuestion.jsx
import { useState, useEffect } from "react";
import {
  deleteRoleQuestionService,
  fetchRolesService,
  parseRoleQuestionsCSVService,
  updateRoleQuestionService,
} from "../Services/ListRoleQuestionServices";
import PageHeader from "../../../components/PageHeader.jsx";
import { BriefcaseBusiness } from "lucide-react";
import { ThreeCircles } from "react-loader-spinner";
import EditRoleQuestionForm from "../Components/EditRoleQuestionForm.jsx";
import RoleQuestionCard from "../Components/RoleQuestionCard.jsx";
import ConfirmPopup from "../../../components/ConfirmPopup";

const ListRoleQuestion = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteRole, setDeleteRole] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    imageFile: null,
    imagePreview: "",
    roleName: "",
    totalQuestions: "",
    csvFile: null,
    csvFileName: "",
    questionsData: null,
  });

  useEffect(() => {
    fetchRolesService(setRoles, setLoading);
  }, []);

  const handleEditStart = (role) => {
    setEditingId(role._id);
    setEditFormData({
      imageFile: null,
      imagePreview: role.image,
      roleName: role.roleName,
      totalQuestions: role.questionsCount,
      csvFile: null,
      csvFileName: role.csvFileName || "",
      questionsData: null,
    });
  };

  const handleImageChange = (file) => {
    setEditFormData((prev) => {
      if (prev.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(prev.imagePreview);
      }

      if (!file) {
        return {
          ...prev,
          imageFile: null,
          imagePreview: "",
        };
      }

      const previewUrl = URL.createObjectURL(file);

      return {
        ...prev,
        imageFile: file,
        imagePreview: previewUrl,
      };
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCsvChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setEditFormData((prev) => ({
        ...prev,
        csvFile: file,
        csvFileName: file.name,
      }));

      const reader = new FileReader();

      reader.onload = (ev) => {
        try {
          const questionsData = parseRoleQuestionsCSVService(ev.target.result);

          if (questionsData.length === 0) return;

          setEditFormData((prev) => ({
            ...prev,
            questionsData,
          }));
        } catch (err) {
          console.error("CSV parse error on edit:", err);
        }
      };

      reader.readAsText(file);
    }
  };

  const handleEditSave = async (id) => {
    try {
      setSaveLoading(true);

      const response = await updateRoleQuestionService(id, editFormData);

      if (response?.success) {
        setRoles((prev) =>
          prev.map((role) => (role._id === id ? response.role : role)),
        );

        setEditingId(null);
      }
    } finally {
      setSaveLoading(false);
    }
  };

  const handleEditCancel = () => {
    if (editFormData.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(editFormData.imagePreview);
    }
    setEditingId(null);
    setEditFormData({
      imageFile: null,
      imagePreview: "",
      roleName: "",
      totalQuestions: "",
      csvFile: "",
    });
  };

  const handleDeleteClick = (role) => {
    setDeleteRole(role);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteRole) return;

    await deleteRoleQuestionService(
      deleteRole._id,
      setRoles,
      setDeleteRole,
      setDeleteLoading,
    );
  };

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
      <PageHeader
        title="Role Questions"
        description="Manage role interview questions and question banks"
        Icon={BriefcaseBusiness}
      />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#2563EB"
              ariaLabel="loading-company-questions"
            />
          </div>
        ) : roles.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
            <p className="text-gray-500">No role questions found.</p>
          </div>
        ) : (
          roles.map((role, index) => (
            <div
              key={role._id}
              className={`group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in border-2 border-transparent ${
                editingId === role._id
                  ? "editing-border"
                  : "hover:animated-border"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {editingId === role._id ? (
                <EditRoleQuestionForm
                  role={role}
                  editFormData={editFormData}
                  saveLoading={saveLoading}
                  handleImageChange={handleImageChange}
                  handleEditChange={handleEditChange}
                  handleCsvChange={handleCsvChange}
                  handleEditCancel={handleEditCancel}
                  handleEditSave={handleEditSave}
                />
              ) : (
                <RoleQuestionCard
                  role={role}
                  handleEditStart={handleEditStart}
                  handleDeleteClick={handleDeleteClick}
                />
              )}
            </div>
          ))
        )}
      </div>

      {deleteRole && (
        <ConfirmPopup
          title="Delete Role"
          item={deleteRole.roleName}
          description={
            <>
              Are you sure you want to delete the role{" "}
              <b>{deleteRole.roleName}</b>?
              <br />
              This action cannot be undone.
            </>
          }
          confirmText="Delete"
          closeText="Cancel"
          confirmColor="blue"
          loading={deleteLoading}
          onClose={() => setDeleteRole(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ListRoleQuestion;
