// Jobvia / Admin / src / pages / AddJob / View / AddJob.jsx
import "./AddJob.css";
import { getTodayDate } from "../../../utils/date";
import { useState } from "react";
import { submitJobService } from "../Services/AddJobServices";
import PageHeader from "../../../components/PageHeader.jsx";
import { Briefcase, Code2, GraduationCap, ListChecks } from "lucide-react";
import CompanyInfoSection from "../Components/CompanyInfoSection.jsx";
import ArrayInputSection from "../Components/ArrayInputSection.jsx";
import JobDetailsSection from "../Components/JobDetailsSection.jsx";
import JobInfoSection from "../Components/JobInfoSection.jsx";
import { ThreeDots } from "react-loader-spinner";

const initialFormState = {
  image: null,
  roleName: "",
  companyName: "",
  techStack: [""],
  location: "",
  experience: "",
  salary: { amount: "", period: "month" },
  jobType: "full-time",
  postDate: getTodayDate(),
  category: "",
  overview: "",
  openings: 1,
  responsibilities: [""],
  jobCriteria: [""],
  education: [""],
};

const AddJob = () => {
  const [formData, setFormData] = useState({ ...initialFormState });
  const [isPosting, setIsPosting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsPosting(true);
      await submitJobService(formData, setFormData, initialFormState);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-blue-50 via-white to-indigo-50 py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title="Post a New Job"
          description="Create a beautiful, high-converting job listing"
          Icon={Briefcase}
        />

        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 border border-white/30"
        >
          <CompanyInfoSection formData={formData} setFormData={setFormData} />

          <ArrayInputSection
            title="Tech Stack"
            fieldName="techStack"
            icon={Code2}
            placeholder="React, Node.js, etc."
            addButtonText="Add another tech"
            formData={formData}
            setFormData={setFormData}
          />

          <JobDetailsSection formData={formData} setFormData={setFormData} />

          <JobInfoSection formData={formData} setFormData={setFormData} />

          <ArrayInputSection
            title="Responsibilities"
            fieldName="responsibilities"
            icon={ListChecks}
            placeholder="Develop new features..."
            addButtonText="Add another responsibility"
            formData={formData}
            setFormData={setFormData}
          />

          <ArrayInputSection
            title="Job Criteria"
            fieldName="jobCriteria"
            icon={ListChecks}
            placeholder="Strong problem-solving skills..."
            addButtonText="Add another criterion"
            formData={formData}
            setFormData={setFormData}
          />

          <ArrayInputSection
            title="Education"
            fieldName="education"
            icon={GraduationCap}
            placeholder="Bachelor's in Computer Science"
            addButtonText="Add another education requirement"
            formData={formData}
            setFormData={setFormData}
          />

          <button
            type="submit"
            disabled={isPosting}
            className={`w-full cursor-pointer bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 sm:py-4 px-5 rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-300 text-sm sm:text-base flex items-center justify-center gap-2 ${isPosting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isPosting ? (
              <>
                <ThreeDots
                  visible={true}
                  height="24"
                  width="40"
                  color="#FFFFFF"
                  secondaryColor="#E2E8F0"
                  radius="9"
                  ariaLabel="posting-job-loader"
                />
              </>
            ) : (
              "Post Job"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
