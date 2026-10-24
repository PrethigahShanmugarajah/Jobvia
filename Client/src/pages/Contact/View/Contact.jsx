import "../Styles/Contact.css";
import { useRef, useState } from "react";
import {
  handleContactChange,
  handleContactSubmit,
} from "../Services/ContactServices";
import ContactInfo from "../Components/ContactInfo";
import ContactForm from "../Components/ContactForm";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  const handleChange = (e) => handleContactChange(e, setFormData);

  const handleSubmit = (e) =>
    handleContactSubmit(e, formData, setFormData, setLoading);

  return (
    <div className="min-h-screen font-[pacifico] py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 mb-3 sm:mb-4">
            Get In Touch
          </h1>

          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            We're excited to hear from you. Let's collaborate and create
            something amazing together.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-6xl">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl sm:rounded-4xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* -------- Left Side -------- */}
                <ContactInfo />

                {/* -------- Right Side -------- */}
                <ContactForm
                  formData={formData}
                  loading={loading}
                  formRef={formRef}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
