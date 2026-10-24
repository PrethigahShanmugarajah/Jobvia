import "../Styles/SignIn.css";
import { useAppContext } from "../../../context/appContext";
import { useState } from "react";
import {
  submitForgotPasswordService,
  submitLoginService,
  submitResetPasswordService,
} from "../Services/SignInServices";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LoginForm from "../Components/LoginForm";
import ForgotPasswordForm from "../Components/ForgotPasswordForm";
import ResetPasswordForm from "../Components/ResetPasswordForm";

const SignIn = () => {
  const { navigate, STORAGE_KEY } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("login");
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleSubmit = (e) =>
    submitLoginService(
      e,
      email,
      password,
      setEmail,
      setPassword,
      setIsLoading,
      STORAGE_KEY,
      navigate,
    );

  /* -------- Handle forgot password -------- */
  const handleForgotPassword = (e) =>
    submitForgotPasswordService(e, resetEmail, setIsLoading, setView);

  /* -------- Handle reset password -------- */
  const handleResetPassword = (e) =>
    submitResetPasswordService(
      e,
      resetEmail,
      otp,
      newPassword,
      setIsLoading,
      setView,
      setResetEmail,
      setOtp,
      setNewPassword,
    );

  return (
    <>
      <div className="min-h-screen font-[pacifico] bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden">
        <Link
          to="/"
          className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-6 md:left-6 lg:top-8 lg:left-8 flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200 group z-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs sm:text-sm">Back to Jobs</span>
        </Link>

        <div className="relative w-full max-w-[96%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-md z-10">
          <div className="animated-border relative">
            <div className="relative bg-white/95 backdrop-blur-sm m-0.5 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 z-10">
              {view === "login" && (
                <LoginForm
                  handleSubmit={handleSubmit}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  setView={setView}
                  setResetEmail={setResetEmail}
                  isLoading={isLoading}
                />
              )}

              {/* -------- Forgot Password -------- */}
              {view === "forgot" && (
                <ForgotPasswordForm
                  handleForgotPassword={handleForgotPassword}
                  resetEmail={resetEmail}
                  setResetEmail={setResetEmail}
                  setView={setView}
                  isLoading={isLoading}
                />
              )}

              {/* -------- Reset Password -------- */}
              {view === "reset" && (
                <ResetPasswordForm
                  handleResetPassword={handleResetPassword}
                  resetEmail={resetEmail}
                  otp={otp}
                  setOtp={setOtp}
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                  showResetPassword={showResetPassword}
                  setShowResetPassword={setShowResetPassword}
                  setView={setView}
                  isLoading={isLoading}
                />
              )}

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    Create Profile
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute -top-20 -left-12 w-48 h-48 bg-purple-200 rounded-full opacity-30 animate-blob animation-delay-2000 pointer-events-none blur-blob"></div>

        <div className="hidden lg:block absolute -bottom-24 -right-20 w-72 h-72 bg-indigo-200 rounded-full opacity-20 animate-blob animation-delay-4000 pointer-events-none blur-blob-large"></div>
      </div>
    </>
  );
};

export default SignIn;
