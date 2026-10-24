// Jobvia / Client / src / pages / Contact / Components / ContactForm.jsx
import "../Styles/Contact.css";
import {
  Briefcase,
  CircleArrowRight,
  Mail,
  MessageSquare,
  Phone,
  User,
} from "lucide-react";
import { InputField } from "../../../components/FormField/InputField";
import { TextAreaField } from "../../../components/FormField/TextAreaField";
import { ThreeDots } from "react-loader-spinner";

const ContactForm = ({
  formData,
  loading,
  formRef,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="order-1 lg:order-2 lg:col-span-3 p-6 sm:p-8 md:p-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 flex items-center gap-2">
        <Briefcase className="w-7 h-7 text-indigo-400" />
        Send Your Inquiry
      </h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-5 sm:space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="group">
            <InputField
              label="Full Name"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Your Name"
              iconLeft={
                <User className="w-5 h-5 group-focus-within:text-blue-400" />
              }
            />
          </div>

          <div className="group">
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@example.com"
              iconLeft={
                <Mail className="w-5 h-5 group-focus-within:text-blue-400" />
              }
            />
          </div>

          <div className="group">
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="0123456789"
              maxLength={10}
              inputMode="numeric"
              pattern="\d{10}"
              iconLeft={
                <Phone className="w-5 h-5 group-focus-within:text-blue-400" />
              }
            />
          </div>

          <div className="group">
            <InputField
              label="Subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Job inquiry, partnership..."
              iconLeft={
                <Briefcase className="w-5 h-5 group-focus-within:text-blue-400" />
              }
            />
          </div>
        </div>

        <div className="group">
          <TextAreaField
            label="Message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(value) =>
              handleChange({
                target: { name: "message", value },
              })
            }
            required
            placeholder="Tell us about your career"
            iconLeft={
              <MessageSquare className="w-5 h-5 group-focus-within:text-blue-400" />
            }
          />
        </div>

        <div className="pt-2 flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className={`group relative cursor-pointer bg-linear-to-r from-indigo-300 to-purple-400 text-white font-bold py-3 sm:py-4 px-8 sm:px-12 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg">
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="24"
                  width="40"
                  color="#FFFFFF"
                  secondaryColor="#E2E8F0"
                  radius="9"
                  ariaLabel="three-dots-loading"
                />
              ) : (
                <>
                  <CircleArrowRight className="w-5 h-5" />
                  Send Message
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
