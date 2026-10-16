// Jobvia / Admin / src / pages / ListJobs Components / EditJobModal.jsx
import { Check, Edit3, ListChecks, X } from "lucide-react";
import CompanyImageSection from "./CompanyImageSection";
import BasicInfoSection from "./BasicInfoSection";
import LocationExperienceSection from "./LocationExperienceSection";
import TechSalarySection from "./TechSalarySection";
import OverviewSection from "./OverviewSection";
import ArrayField from "./ArrayField";
import {
  addArrayItemService,
  removeArrayItemService,
} from "../Services/ListJobsServices";
import EducationInfoSection from "./EducationInfoSection";
import { Oval } from "react-loader-spinner";

const EditJobModal = ({
  showModal,
  editingJob,
  setEditingJob,
  isUpdating,
  handleSave,
  closeModal,
  handleFieldChange,
  fileInputRef,
  handleBrowseClick,
  handleFileChange,
  handleRemoveImage,
  editingLocationIndex,
  editingLocationText,
  setEditingLocationIndex,
  setEditingLocationText,
  startEditLocation,
  cancelEditLocation,
  newTech,
  setNewTech,
  newResponsibility,
  setNewResponsibility,
  newCriterion,
  setNewCriterion,
  newEducation,
  setNewEducation,
}) => {
  if (!showModal || !editingJob) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-job-title"
    >
      {/* -------- Backdrop -------- */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
        aria-hidden
      />

      <form
        onSubmit={handleSave}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10 animate-slideUp ring-1 ring-slate-100"
      >
        {/* -------- Header -------- */}
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-t-2xl flex items-center justify-between flex-col md:flex-row gap-2 md:gap-0">
          <div>
            <h3
              id="edit-job-title"
              className="text-xl font-bold flex items-center gap-2"
            >
              <Edit3 size={20} />
              Edit Job – {editingJob.role || "Untitled"}
            </h3>

            <p className="text-sm text-white/80 mt-1">
              {editingJob.company ?? "Unknown company"} ·{" "}
              {editingJob.category ?? "Uncategorized"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full p-1.5 hover:bg-white/20 transition-colors"
              onClick={closeModal}
              aria-label="Close edit"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          {/* -------- Image Upload Section -------- */}
          <CompanyImageSection
            editingJob={editingJob}
            fileInputRef={fileInputRef}
            handleBrowseClick={handleBrowseClick}
            handleFileChange={handleFileChange}
            handleRemoveImage={handleRemoveImage}
          />

          {/* -------- Basic Info -------- */}
          <BasicInfoSection
            editingJob={editingJob}
            handleFieldChange={handleFieldChange}
          />

          {/* -------- Location & Experience -------- */}
          <LocationExperienceSection
            editingJob={editingJob}
            setEditingJob={setEditingJob}
            handleFieldChange={handleFieldChange}
            editingLocationIndex={editingLocationIndex}
            editingLocationText={editingLocationText}
            setEditingLocationIndex={setEditingLocationIndex}
            setEditingLocationText={setEditingLocationText}
            startEditLocation={startEditLocation}
            cancelEditLocation={cancelEditLocation}
          />

          {/* -------- Tech & Salary -------- */}
          <TechSalarySection
            editingJob={editingJob}
            setEditingJob={setEditingJob}
            handleFieldChange={handleFieldChange}
            newTech={newTech}
            setNewTech={setNewTech}
          />

          {/* -------- Overview -------- */}
          <OverviewSection
            editingJob={editingJob}
            handleFieldChange={handleFieldChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* -------- Responsibilities -------- */}
            <ArrayField
              title="Responsibilities"
              icon={<ListChecks size={16} className="text-indigo-500" />}
              items={editingJob?.responsibilities || []}
              value={newResponsibility}
              onChange={setNewResponsibility}
              onAdd={() => {
                addArrayItemService(
                  editingJob,
                  setEditingJob,
                  "responsibilities",
                  newResponsibility,
                );
                setNewResponsibility("");
              }}
              onRemove={(idx) =>
                removeArrayItemService(setEditingJob, "responsibilities", idx)
              }
              name="newResponsibility"
              placeholder="Add a responsibility"
              ariaLabel="responsibility"
            />

            {/* -------- Criteria -------- */}
            <ArrayField
              title="Criteria"
              icon={<ListChecks size={16} className="text-indigo-500" />}
              items={editingJob?.criteria || []}
              value={newCriterion}
              onChange={setNewCriterion}
              onAdd={() => {
                addArrayItemService(
                  editingJob,
                  setEditingJob,
                  "criteria",
                  newCriterion,
                );
                setNewCriterion("");
              }}
              onRemove={(idx) =>
                removeArrayItemService(setEditingJob, "criteria", idx)
              }
              name="newCriterion"
              placeholder="Add a criterion"
              ariaLabel="criterion"
            />
          </div>

          {/* -------- Education & Misc (unchanged) -------- */}
          <EducationInfoSection
            editingJob={editingJob}
            setEditingJob={setEditingJob}
            handleFieldChange={handleFieldChange}
            newEducation={newEducation}
            setNewEducation={setNewEducation}
          />
        </div>

        {/* -------- Footer Actions -------- */}
        <div className="sticky bottom-0 bg-slate-50 px-4 sm:px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isUpdating}
            className={`px-5 py-2.5 rounded-lg bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-md flex items-center gap-2 ${isUpdating ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isUpdating ? (
              <>
                <Oval
                  height={16}
                  width={16}
                  color="#FFFFFF"
                  secondaryColor="#E2E8F0"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                  ariaLabel="updating"
                />
              </>
            ) : (
              <>
                <Check size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditJobModal;
