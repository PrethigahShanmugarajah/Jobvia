// Jobvia / Client / src / pages / SignUp / View / SignUp.jsx
import "../Styles/SignUp.css";
import { useAppContext } from "../../../context/appContext";
import { useState } from "react";
import {
  submitSignUpService,
  submitVerifyEmailService,
} from "../Services/SignUpServices";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import VerifyEmailForm from "../Components/VerifyEmailForm";
import SignUpForm from "../Components/SignUpForm";

const SignUp = () => {
  const { navigate } = useAppContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e) =>
    submitSignUpService(
      e,
      formData,
      validateForm,
      setIsLoading,
      setIsVerifying,
    );

  const handleVerifyOTP = (e) =>
    submitVerifyEmailService(e, formData.email, otp, setIsLoading, navigate);

  return (
    <>
      <div className="min-h-screen font-[pacifico] bg-linear-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4 relative overflow-hidden">
        <Link
          to={isVerifying ? "#" : "/login"}
          onClick={(e) => {
            if (isVerifying) {
              e.preventDefault();
              setIsVerifying(false);
            }
          }}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200 group z-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs sm:text-sm">
            {isVerifying ? "Back to Signup" : "Sign In"}
          </span>
        </Link>

        <div className="relative w-full max-w-[96%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-md z-10">
          <div className="animated-border relative">
            <div className="relative bg-white/95 backdrop-blur-sm m-0.5 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 text-center">
                {isVerifying ? "Verify Code" : "Join JobPortal"}
              </h2>

              <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
                {isVerifying
                  ? `We've sent a 6-digit code to ${formData.email}`
                  : "Create your account and start your journey."}
              </p>

              {isVerifying ? (
                <VerifyEmailForm
                  handleVerifyOTP={handleVerifyOTP}
                  otp={otp}
                  setOtp={setOtp}
                  isLoading={isLoading}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <SignUpForm
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              )}

              {!isVerifying && (
                <div className="mt-4 sm:mt-6 text-center">
                  <p className="text-gray-600 text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-emerald-600 font-medium transition"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          aria-hidden
          className="hidden md:block absolute -top-24 -left-12 w-44 h-44 bg-emerald-200 rounded-full opacity-28 animate-blob pointer-events-none blur-blob"
        />

        <div
          aria-hidden
          className="hidden lg:block absolute -bottom-28 -right-20 w-72 h-72 bg-teal-200 rounded-full opacity-20 animate-blob pointer-events-none blur-blob-large"
        />
      </div>
    </>
  );
};

export default SignUp;
