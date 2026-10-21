// Jobvia / Client / src / pages / SignUp / Components / SignUpForm.jsx
import "../Styles/SignUp.css";
import { InputField } from "../../../components/FormField/InputField";
import { CheckCircle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const SignUpForm = ({
  formData,
  handleChange,
  handleSubmit,
  isLoading,
  showPassword,
  setShowPassword,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <div>
        <InputField
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
          iconLeft={<User className="w-5 h-5" />}
        />
      </div>

      <div>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          iconLeft={<Mail className="w-5 h-5" />}
        />
      </div>

      <div>
        <InputField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="******"
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
                <Eye size={18} className="text-gray-500 hover:text-gray-700" />
              )}
            </span>
          }
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-full transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 text-sm sm:text-base"
      >
        {isLoading ? (
          <ThreeDots
            height="24"
            width="40"
            radius="9"
            color="#FFFFFF"
            secondaryColor="#E2E8F0"
            ariaLabel="creating-account"
            visible={true}
          />
        ) : (
          <>
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Sign Up</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
