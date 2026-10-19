// Jobvia / Admin / src / pages / Login / View / Login.jsx
import { useState } from "react";
import { useAppContext } from "../../../context/appContext";
import { loginAdminService } from "../Services/LoginServices";
import PageHeader from "../../../components/PageHeader";
import { ShieldCheck } from "lucide-react";
import LoginForm from "../Components/LoginForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { navigate } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      await loginAdminService(email, password, navigate);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-[pacifico] bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300 hover:shadow-3xl border border-white/20">
        <PageHeader
          title="Admin Panel"
          description="Jobvia Administration"
          Icon={ShieldCheck}
        />

        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loading={loading}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
