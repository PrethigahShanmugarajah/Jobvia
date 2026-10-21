// Jobvia / Client / src / pages / SignUp / Components / VerifyEmailForm.jsx
import "../Styles/SignUp.css";
import { InputField } from "../../../components/FormField/InputField";
import { ShieldCheck } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const VerifyEmailForm = ({
  handleVerifyOTP,
  otp,
  setOtp,
  isLoading,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleVerifyOTP} className="space-y-6">
      <div>
        <InputField
          label="Enter Verification Code"
          name="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          placeholder="Enter verification code"
          maxLength={6}
          iconLeft={<ShieldCheck className="w-5 h-5" />}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer bg-linear-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-full transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
      >
        {isLoading ? (
          <ThreeDots
            height="24"
            width="40"
            radius="9"
            color="#FFFFFF"
            secondaryColor="#E2E8F0"
            ariaLabel="verifying"
            visible={true}
          />
        ) : (
          "Verify & Continue"
        )}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={handleSubmit}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition"
        >
          Resend Code
        </button>
      </div>
    </form>
  );
};

export default VerifyEmailForm;
