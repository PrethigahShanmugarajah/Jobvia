// Jobvia / Client / src / pages / ViewProfile / Components / ViewProfileCard.jsx
import "../Styles/ViewProfile.css";
import { FileText, Mail, Phone, Trash2, User } from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import {
  getResumeFileNameService,
  handleDeleteResumeService,
  handlePhoneChangeService,
  handleResumeUploadService,
} from "../Services/ViewProfileServices";
import { FileInputField } from "../../../components/FormField/FileInputField";

const ViewProfileCard = ({
  profile,
  setProfile,
  isEditing,
  handleChange,
  handleViewResume,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-4 sm:pb-6 border-b border-gray-200/50">
        <div className="shrink-0 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-xl w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-24 lg:h-24 xl:w-24 xl:h-24 text-2xl sm:text-3xl md:text-4xl">
          {profile.name
            ? profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : "U"}
        </div>

        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-gray-800">
            {profile.name || "Your Name"}
          </h2>

          <p className="text-gray-500 flex items-center gap-2 mt-1 text-sm sm:text-base">
            <Mail className="w-4 h-4" />
            {profile.email || "example.example.com"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          {isEditing ? (
            <InputField
              label="Full Name"
              name="name"
              type="text"
              value={profile.name}
              onChange={handleChange}
              placeholder="John Dow"
              iconLeft={<User className="w-4 h-4 text-blue-600" />}
              required
            />
          ) : (
            <>
              <label className="block font-medium text-black">Full Name</label>
              <p className="text-gray-800 px-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100 text-sm sm:text-base">
                {profile.name}
              </p>
            </>
          )}
        </div>

        <div className="space-y-2">
          {isEditing ? (
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="example@example.com"
              iconLeft={<Mail className="w-4 h-4 text-blue-600" />}
              required
            />
          ) : (
            <>
              <label className="block font-medium text-black">
                Email Address
              </label>
              <p className="text-gray-800 px-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100 text-sm sm:text-base">
                {profile.email}
              </p>
            </>
          )}
        </div>

        <div className="space-y-2">
          {isEditing ? (
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              value={profile.phone}
              onChange={(e) => handlePhoneChangeService(e, setProfile)}
              placeholder="+1234567890"
              iconLeft={<Phone className="w-4 h-4 text-blue-600" />}
              required
            />
          ) : (
            <>
              <label className="block font-medium text-black">Phone</label>
              <p className="text-gray-800 px-4 py-3 bg-gray-50/50 rounded-xl border border-gray-100 text-sm sm:text-base">
                {profile.phone}
              </p>
            </>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          {isEditing ? (
            <div className="space-y-3">
              <FileInputField
                label="Resume (PDF or Word)"
                name="resume"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                imagePreview={false}
                fileName={
                  profile.resume ? getResumeFileNameService(profile.resume) : ""
                }
                triggerText="Choose file..."
                onChange={(file) => {
                  if (file) {
                    handleResumeUploadService(
                      { target: { files: [file] } },
                      setProfile,
                    );
                  }
                }}
                required
              />

              {profile.resume && (
                <>
                  <p className="text-sm text-green-600 truncate">
                    File uploaded: {profile.resume.name || "Uploaded Resume"}
                  </p>

                  <button
                    type="button"
                    onClick={() => handleDeleteResumeService(setProfile)}
                    className="p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200 shrink-0"
                    title="Delete resume"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div>
              {profile.resume ? (
                <button
                  onClick={handleViewResume}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-200 hover:bg-indigo-100 transition-colors text-sm sm:text-base cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  View Resume{" "}
                  {profile.resume
                    ? `(${getResumeFileNameService(profile.resume)})`
                    : ""}
                </button>
              ) : (
                <p className="text-gray-500 italic text-sm sm:text-base">
                  No resume uploaded
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfileCard;
