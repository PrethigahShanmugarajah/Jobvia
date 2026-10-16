/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
// Jobvia / Admin / src / pages / ListJobs / View / ListJobs.jsx
import "./ListJobs.css";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../../../context/appContext";
import {
  fetchJobsService,
  deleteJobService,
  updateJobService,
  mapBackToFrontendService,
  buildJobFormDataService,
  filterJobsService,
} from "../Services/ListJobsServices";
import JobListingsHeader from "../Components/JobListingsHeader";
import JobCard from "../Components/JobCard";
import EditJobModal from "../Components/EditJobModal";
import ConfirmPopup from "../../../components/ConfirmPopup";

const ListJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { navigate, BASE_URL } = useAppContext();

  const fetchJobs = async () => {
    try {
      const jobs = await fetchJobsService(BASE_URL);
      setJobs(jobs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const [newTech, setNewTech] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");
  const [newCriterion, setNewCriterion] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [editingLocationIndex, setEditingLocationIndex] = useState(null);
  const [editingLocationText, setEditingLocationText] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");

  const fileInputRef = useRef(null);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id) => {
    setDeletingJobId(id);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    if (isDeleting) return;

    setShowDeletePopup(false);
    setDeletingJobId(null);
  };

  const confirmDelete = async () => {
    if (!deletingJobId) return;

    try {
      setIsDeleting(true);

      const res = await deleteJobService(deletingJobId);

      if (res?.success) {
        setJobs((prev) => prev.filter((j) => j.id !== deletingJobId));
        setShowDeletePopup(false);
        setDeletingJobId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEdit = (job) => {
    setEditingJob(JSON.parse(JSON.stringify(job)));
    setShowModal(true);
    setNewTech("");
    setNewResponsibility("");
    setNewCriterion("");
    setNewEducation("");
    setEditingLocationIndex(null);
    setEditingLocationText("");
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingJob(null);
    setEditingLocationIndex(null);
    setEditingLocationText("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingJob) return;

    try {
      setIsUpdating(true);

      const formDataToSend = await buildJobFormDataService(editingJob);

      const res = await updateJobService(editingJob.id, formDataToSend);

      if (res?.success) {
        const updatedJob = mapBackToFrontendService(res.job, BASE_URL);
        setJobs((prev) =>
          prev.map((j) => (j.id === editingJob.id ? updatedJob : j)),
        );
        closeModal();
      }
    } catch (error) {
      console.error("Error updating job:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setEditingJob((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      handleFieldChange("image", ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    handleFieldChange("image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startEditLocation = (idx) => {
    setEditingLocationIndex(idx);
    setEditingLocationText(editingJob?.locations?.[idx] ?? "");
  };

  const cancelEditLocation = () => {
    setEditingLocationIndex(null);
    setEditingLocationText("");
  };

  const filteredJobs = filterJobsService(jobs, companyFilter);

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <JobListingsHeader
          companyFilter={companyFilter}
          setCompanyFilter={setCompanyFilter}
          jobsCount={filteredJobs.length}
        />

        {/* -------- Grid -------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={openEdit}
              onDelete={handleDelete}
              onViewApplicants={(job) =>
                navigate("/applicants", {
                  state: {
                    jobId: job.id,
                    role: job.role,
                    companyName: job.company,
                  },
                })
              }
            />
          ))}
        </div>
      </div>

      {/* -------- Edit Modal -------- */}
      {showModal && editingJob && (
        <EditJobModal
          showModal={showModal}
          editingJob={editingJob}
          setEditingJob={setEditingJob}
          isUpdating={isUpdating}
          handleSave={handleSave}
          closeModal={closeModal}
          handleFieldChange={handleFieldChange}
          fileInputRef={fileInputRef}
          handleBrowseClick={handleBrowseClick}
          handleFileChange={handleFileChange}
          handleRemoveImage={handleRemoveImage}
          editingLocationIndex={editingLocationIndex}
          editingLocationText={editingLocationText}
          setEditingLocationIndex={setEditingLocationIndex}
          setEditingLocationText={setEditingLocationText}
          startEditLocation={startEditLocation}
          cancelEditLocation={cancelEditLocation}
          newTech={newTech}
          setNewTech={setNewTech}
          newResponsibility={newResponsibility}
          setNewResponsibility={setNewResponsibility}
          newCriterion={newCriterion}
          setNewCriterion={setNewCriterion}
          newEducation={newEducation}
          setNewEducation={setNewEducation}
        />
      )}

      {/* -------- Delete Confirmation Popup -------- */}
      {showDeletePopup && (
        <ConfirmPopup
          title="Delete Job?"
          description={
            <>
              Are you sure you want to delete the{" "}
              <strong>
                {jobs.find((job) => job.id === deletingJobId)?.role}
              </strong>{" "}
              job at{" "}
              <strong>
                {jobs.find((job) => job.id === deletingJobId)?.company}
              </strong>
              ? This action cannot be undone.
            </>
          }
          confirmText="Delete"
          closeText="Cancel"
          onClose={closeDeletePopup}
          onConfirm={confirmDelete}
          loading={isDeleting}
        />
      )}
    </div>
  );
};

export default ListJobs;
