import { createJob } from "../../../services/mutations";
import { getTodayDate } from "../../../utils/date";

/* -------- Submit job -------- */
export const submitJobService = async (
  formData,
  setFormData,
  initialFormState,
) => {
  const formDataToSend = new FormData();

  formDataToSend.append("roleName", formData.roleName);
  formDataToSend.append("companyName", formData.companyName);
  formDataToSend.append("location", formData.location);
  formDataToSend.append("experience", formData.experience);
  formDataToSend.append("salary", formData.salary.amount);
  formDataToSend.append("salaryType", formData.salary.period);
  formDataToSend.append("jobType", formData.jobType);
  formDataToSend.append("postDate", formData.postDate);
  formDataToSend.append("category", formData.category);
  formDataToSend.append("openings", formData.openings);
  formDataToSend.append("overview", formData.overview);

  formDataToSend.append(
    "techStack",
    JSON.stringify(formData.techStack.filter((item) => item.trim() !== "")),
  );

  formDataToSend.append(
    "responsibilities",
    JSON.stringify(
      formData.responsibilities.filter((item) => item.trim() !== ""),
    ),
  );

  formDataToSend.append(
    "jobCriteria",
    JSON.stringify(formData.jobCriteria.filter((item) => item.trim() !== "")),
  );

  formDataToSend.append(
    "education",
    JSON.stringify(formData.education.filter((item) => item.trim() !== "")),
  );

  if (formData.image) {
    formDataToSend.append("companyLogo", formData.image);
  }

  const response = await createJob(formDataToSend);

  if (response?.success) {
    setFormData({ ...initialFormState, postDate: getTodayDate() });
  }

  return response;
};

/* -------- Manage array fields -------- */
export const handleArrayChangeService = (
  formData,
  setFormData,
  field,
  index,
  value,
) => {
  const newArray = [...formData[field]];
  newArray[index] = value;
  setFormData({ ...formData, [field]: newArray });
};

export const addArrayFieldService = (formData, setFormData, field) => {
  setFormData({ ...formData, [field]: [...formData[field], ""] });
};

export const removeArrayFieldService = (
  formData,
  setFormData,
  field,
  index,
) => {
  if (formData[field].length > 1) {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  }
};
