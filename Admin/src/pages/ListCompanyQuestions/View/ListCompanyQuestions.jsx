// Jobvia / Admin / src / pages / ListCompanyQuestions / View / ListCompanyQuestions.jsx
import { useState, useEffect } from "react";
import {
  deleteCompanyQuestionService,
  fetchCompanyQuestionsService,
  updateCompanyQuestionService,
} from "../Services/ListCompanyQuestionsServices";
import PageHeader from "../../../components/PageHeader";
import { Building2 } from "lucide-react";
import { ThreeCircles } from "react-loader-spinner";
import CompanyQuestionCard from "../Components/CompanyQuestionCard";
import EditCompanyQuestionModal from "../Components/EditCompanyQuestionModal";
import ConfirmPopup from "../../../components/ConfirmPopup";

const ListCompanyQuestions = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    totalQuestions: "",
    imageFile: null,
    imagePreview: "",
    csvFile: null,
    csvFileName: "",
    parsedQuestions: [],
  });

  useEffect(() => {
    return () => {
      if (formData.imagePreview && formData.imageFile) {
        URL.revokeObjectURL(formData.imagePreview);
      }

      companies.forEach((c) => {
        if (c._objectUrl) {
          URL.revokeObjectURL(c._objectUrl);
        }
      });
    };
  }, [companies, formData.imageFile, formData.imagePreview]);

  useEffect(() => {
    fetchCompanyQuestionsService(setCompanies, setLoading);
  }, []);

  useEffect(() => {
    if (isEditModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    return undefined;
  }, [isEditModalOpen]);

  const handleDelete = (id, name) => {
    setDeleteConfirmation({ id, name });
  };

  const confirmDelete = async () => {
    try {
      await deleteCompanyQuestionService(
        deleteConfirmation,
        setCompanies,
        setDeleteConfirmation,
      );
    } catch {
      //
    }
  };

  const handleEdit = async (company) => {
    setEditingCompany(company);

    setFormData({
      name: company.companyName || company.name,
      totalQuestions: String(
        company.questionsCount || company.totalQuestions || "",
      ),
      imageFile: null,
      imagePreview:
        company.logo || company._objectUrl || company.imageUrl || "",
      csvFile: null,
      csvFileName: company.csvFileName || "",
      parsedQuestions: [],
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!editingCompany || isSaving) {
      return;
    }

    try {
      setIsSaving(true);

      await updateCompanyQuestionService(
        editingCompany,
        formData,
        setCompanies,
        setIsEditModalOpen,
        setEditingCompany,
        setFormData,
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseModal = () => {
    if (formData.imagePreview && formData.imageFile) {
      URL.revokeObjectURL(formData.imagePreview);
    }
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
  };

  return (
    <div className="p-6 sm:p-4 md:p-6 bg-gray-50 font-[pacifico] min-h-screen">
      <PageHeader
        title="Company Questions"
        description="Manage company questions and assessments"
        Icon={Building2}
      />

      {/* -------- Grid Of Cards -------- */}
      {loading && (
        <div className="flex flex-col items-center py-20">
          <ThreeCircles
            visible={true}
            height="100"
            width="100"
            color="#2563EB"
            ariaLabel="loading-company-questions"
          />
        </div>
      )}

      {!loading && companies.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No company questions added yet.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {companies.map((company) => (
          <CompanyQuestionCard
            key={company._id || company.id}
            company={company}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      {/* -------- Edit Modal -------- */}
      {isEditModalOpen && (
        <EditCompanyQuestionModal
          formData={formData}
          setFormData={setFormData}
          handleCloseModal={handleCloseModal}
          handleSave={handleSave}
          isSaving={isSaving}
        />
      )}

      {deleteConfirmation && (
        <ConfirmPopup
          title="Delete Company?"
          item={deleteConfirmation.name}
          description={
            <>
              Are you sure you want to delete{" "}
              <strong>{deleteConfirmation.name}</strong>? This action cannot be
              undone.
            </>
          }
          confirmText="Delete"
          closeText="Cancel"
          confirmColor="blue"
          onClose={() => setDeleteConfirmation(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default ListCompanyQuestions;
