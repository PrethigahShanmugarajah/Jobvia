// Jobvia / Client / src / pages / SignIn / Components / LoginForm.jsx;
import "../Styles/SignIn.css";
import { InputField } from "../../../components/FormField/InputField";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const LoginForm = ({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  setView,
  setResetEmail,
  isLoading,
}) => {
  return (
    <>
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
        Sign in to Jobvia
      </h2>

      <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
        Access your applications, saved jobs and profile.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <InputField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@example.com"
            iconLeft={<Mail className="w-5 h-5" />}
          />
        </div>

        <div>
          <InputField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="********"
            iconLeft={<Lock className="w-5 h-5" />}
            iconRight={
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
              >
                {showPassword ? (
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

        <div className="text-right">
          <button
            type="button"
            onClick={() => {
              setView("forgot");
              setResetEmail(email);
            }}
            className="text-sm text-blue-600 hover:text-blue-800 transition font-medium"
          >
            Forgot Password
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full cursor-pointer bg-linear-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-full hover:scale-105 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <ThreeDots
              height="24"
              width="40"
              radius="9"
              color="#FFFFFF"
              secondaryColor="#E2E8F0"
              ariaLabel="signing-in"
              visible={true}
            />
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Sign In
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
