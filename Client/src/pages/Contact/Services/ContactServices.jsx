// Jobvia / Client / src / pages / Contact / Services / ContactServices.jsx
import { toast } from "react-toastify";
import { sendInquiry } from "../../../services/mutations";

/* -------- Handle Form Changes -------- */
export const handleContactChange = (e, setFormData) => {
  const { name, value } = e.target;

  if (name === "phone") {
    const digitsOnly = value.replace(/\D/g, "");

    setFormData((prev) => ({
      ...prev,
      phone: digitsOnly.slice(0, 10),
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

/* -------- Submit Contact Inquiry -------- */
export const handleContactSubmit = async (
  e,
  formData,
  setFormData,
  setLoading,
) => {
  e.preventDefault();

  if (formData.phone.length !== 10) {
    toast.error("Please enter a valid 10-digit mobile phone number.");
    return;
  }

  setLoading(true);

  try {
    const data = await sendInquiry(formData);

    if (data?.success) {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }
  } finally {
    setLoading(false);
  }
};
