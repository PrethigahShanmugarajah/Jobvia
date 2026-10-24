import "../Styles/SignIn.css";
import { InputField } from "../../../components/FormField/InputField";
import { Eye, EyeOff, Lock } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const ResetPasswordForm = ({
  handleResetPassword,
  resetEmail,
  otp,
  setOtp,
  newPassword,
  setNewPassword,
  showResetPassword,
  setShowResetPassword,
  setView,
  isLoading,
}) => {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
        Reset Password
      </h2>

      <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
        Enter the code sent to {resetEmail}
      </p>

      <form onSubmit={handleResetPassword} className="space-y-4 sm:space-y-5">
        <div>
          <InputField
            label="Verification Code"
            name="otp"
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            placeholder="Enter verification code"
          />
        </div>

        <div>
          <InputField
            label="New Password"
            name="newPassword"
            type={showResetPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="••••••••"
            iconLeft={<Lock className="w-5 h-5" />}
            iconRight={
              <span
                role="button"
                tabIndex={0}
                aria-label={
                  showResetPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowResetPassword(!showResetPassword)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setShowResetPassword(!showResetPassword);
                  }
                }}
                className="cursor-pointer"
              >
                {showResetPassword ? (
                  <EyeOff
                    size={18}
                    className="text-gray-500 hover:text-gray-700"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-gray-500 hover:text-gray-700"
                  />
                )}
              </span>
            }
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-full hover:scale-105 transition-all shadow-lg disabled:opacity-50"
        >
          {isLoading ? (
            <ThreeDots
              height="24"
              width="40"
              radius="9"
              color="#FFFFFF"
              secondaryColor="#E2E8F0"
              ariaLabel="resetting-password"
              visible={true}
            />
          ) : (
            "Reset Password"
          )}
        </button>

        <button
          type="button"
          onClick={() => setView("login")}
          className="w-full text-sm text-gray-500 hover:text-gray-700 transition font-medium"
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default ResetPasswordForm;
