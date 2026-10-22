// Jobvia / Client / src / pages / ViewProfile / View / ViewProfile.jsx
import "../Styles/ViewProfile.css";
import { useEffect, useState } from "react";
import {
  cancelProfileEditService,
  fetchUserProfileService,
  handleProfileChangeService,
  saveUserProfileService,
  viewUserResumeService,
} from "../Services/ViewProfileServices";
import ViewProfileHeader from "../Components/ViewProfileHeader";
import ViewProfileCard from "../Components/ViewProfileCard";

const ViewProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });
  const [originalProfile, setOriginalProfile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUserProfileService(setProfile, setOriginalProfile);
  }, []);

  const handleChange = (e) => {
    handleProfileChangeService(e, setProfile);
  };

  const handleSave = () =>
    saveUserProfileService(
      profile,
      setIsSaving,
      setProfile,
      setOriginalProfile,
      setIsEditing,
    );

  const handleCancel = () =>
    cancelProfileEditService(originalProfile, setProfile, setIsEditing);

  const handleViewResume = () =>
    viewUserResumeService(profile, originalProfile);

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-indigo-50 via-white to-purple-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-4xl mx-auto">
        <ViewProfileHeader
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleCancel={handleCancel}
          handleSave={handleSave}
          isSaving={isSaving}
        />

        {/* -------- Profile Card -------- */}
        <ViewProfileCard
          profile={profile}
          setProfile={setProfile}
          isEditing={isEditing}
          handleChange={handleChange}
          handleViewResume={handleViewResume}
        />
      </div>
    </div>
  );
};

export default ViewProfile;
