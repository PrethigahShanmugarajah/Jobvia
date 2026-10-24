import { InputField } from "../../../components/FormField/InputField";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  loading,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@example.com"
        iconLeft={<Mail className="text-gray-400" size={18} />}
        required
      />

      <InputField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="********"
        iconLeft={<Lock className="text-gray-400" />}
        iconRight={
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="p-1 rounded-md cursor-pointer text-blue-500 hover:text-blue-600"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        }
        required
      />

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-blue-400 to-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-full transform transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        {loading ? (
          <>
            <ThreeDots
              visible={true}
              height="20"
              width="40"
              color="#FFFFFF"
              secondaryColor="#E2E8F0"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </>
        ) : (
          <>
            <LogIn size={18} className="transition-transform" /> Sign In
          </>
        )}
      </button>
    </form>
  );
};

export default LoginForm;
