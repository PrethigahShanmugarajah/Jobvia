// Jobvia / Client / src / pages / ViewProfile / Services / ViewProfileServices.jsx
import { fetchUserProfile, fetchUserResume } from "../../../services/fetch";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../../services/mutations";

/* -------- Fetch user profile -------- */
export const fetchUserProfileService = async (
  setProfile,
  setOriginalProfile,
) => {
  try {
    const data = await fetchUserProfile();

    if (!data?.success || !data?.user) {
      return;
    }

    setProfile({
      name: data.user.name || "",
      email: data.user.email || "",
      phone: data.user.phone || "",
      resume: data.user.resume || "",
    });

    setOriginalProfile(data.user);
  } catch (error) {
    console.error("Load User Profile Error:", error);
  }
};

/* -------- Handle profile input changes -------- */
export const handleProfileChangeService = (e, setProfile) => {
  const { name, value } = e.target;

  setProfile((prev) => ({ ...prev, [name]: value }));
};

/* -------- Handle phone input changes -------- */
export const handlePhoneChangeService = (e, setProfile) => {
  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);

  setProfile((prev) => ({ ...prev, phone: digits }));
};

/* -------- Handle resume upload -------- */
export const handleResumeUploadService = (e, setProfile) => {
  const file = e.target.files[0];

  if (!file) {
    return;
  }

  setProfile((prev) => ({ ...prev, resume: file }));
};

/* -------- Handle resume deletion -------- */
export const handleDeleteResumeService = (setProfile) => {
  setProfile((prev) => ({ ...prev, resume: null }));
};

/* -------- Validate profile -------- */
export const validateProfileService = (profile) => {
  if (!profile.name.trim()) {
    return "Name is required";
  }

  if (!profile.email.trim()) {
    return "Email is required";
  }

  if (!/\S+@\S+\.\S+/.test(profile.email)) {
    return "Email is invalid";
  }

  if (!profile.phone) {
    return "Phone is required";
  }

  if (!/^\d{10}$/.test(profile.phone)) {
    return "Phone must be exactly 10 digits";
  }

  return null;
};

/* -------- Handle profile saving -------- */
export const saveUserProfileService = async (
  profile,
  setIsSaving,
  setProfile,
  setOriginalProfile,
  setIsEditing,
) => {
  const error = validateProfileService(profile);

  if (error) {
    toast.error(error);
    return;
  }

  try {
    setIsSaving(true);

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);

    if (profile.resume instanceof File) {
      formData.append("resume", profile.resume);
    }

    const data = await updateUserProfile(formData);

    if (!data?.success || !data?.user) {
      return;
    }

    setProfile({
      name: data.user.name || "",
      email: data.user.email || "",
      phone: data.user.phone || "",
      resume: data.user.resume || "",
    });

    setOriginalProfile(data.user);
    setIsEditing(false);
  } catch (error) {
    console.error("Save User Profile Error:", error);
  } finally {
    setIsSaving(false);
  }
};

/* -------- Handle profile cancellation -------- */
export const cancelProfileEditService = (
  originalProfile,
  setProfile,
  setIsEditing,
) => {
  if (!originalProfile) {
    return;
  }

  setProfile({
    name: originalProfile.name || "",
    email: originalProfile.email || "",
    phone: originalProfile.phone || "",
    resume: originalProfile.resume || "",
  });

  setIsEditing(false);
};

/* -------- Get resume file name -------- */
export const getResumeFileNameService = (resume) => {
  if (!resume) return "";
  if (resume instanceof File) return resume.name;

  if (typeof resume === "string") {
    const fileName = resume.split("/").pop();

    return fileName.split("-").slice(1).join("-") || fileName;
  }

  return "Resume";
};

/* -------- View user resume -------- */
export const viewUserResumeService = async (profile, originalProfile) => {
  if (!profile.resume) {
    return;
  }

  if (profile.resume instanceof File) {
    const url = URL.createObjectURL(profile.resume);
    window.open(url, "_blank");
    return;
  }

  if (typeof profile.resume !== "string" || !originalProfile?._id) {
    return;
  }

  const newTab = window.open("", "_blank");

  if (!newTab) {
    toast.error("Please allow pop-ups to view your resume.");
    return;
  }

  try {
    const resumeBlob = await fetchUserResume(originalProfile._id);
    const url = URL.createObjectURL(resumeBlob);

    newTab.location.href = url;
  } catch (error) {
    newTab.close();
    console.error("View Resume Error:", error);
  }
};
