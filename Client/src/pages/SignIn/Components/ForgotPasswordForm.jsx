import "../Styles/SignIn.css";
import { InputField } from "../../../components/FormField/InputField";
import { Mail } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const ForgotPasswordForm = ({
  handleForgotPassword,
  resetEmail,
  setResetEmail,
  setView,
  isLoading,
}) => {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
        Forgot Password
      </h2>

      <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
        Enter your email to receive a reset code.
      </p>

      <form onSubmit={handleForgotPassword} className="space-y-4 sm:space-y-5">
        <div>
          <InputField
            label="Email address"
            name="resetEmail"
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
            placeholder="you@domain.com"
            iconLeft={<Mail className="w-5 h-5" />}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-full hover:scale-105 transition-all shadow-lg disabled:opacity-50"
        >
          {isLoading ? (
            <ThreeDots
              height="24"
              width="40"
              radius="9"
              color="#FFFFFF"
              secondaryColor="#E2E8F0"
              ariaLabel="sending-otp"
              visible={true}
            />
          ) : (
            "Send Reset Code"
          )}
        </button>

        <button
          type="button"
          onClick={() => setView("login")}
          className="w-full text-sm text-gray-500 hover:text-gray-700 transition font-medium"
        >
          Back to Login
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
