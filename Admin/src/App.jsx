// Jobvia / Admin / src / App.jsx
import { useAppContext } from "./context/appContext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/View/Login";
import Dashboard from "./pages/Dashboard/View/Dashboard";
import AddJob from "./pages/AddJob/View/AddJob";
import ListJobs from "./pages/ListJobs/View/ListJobs";
import Companies from "./pages/Companies/View/Companies";
import CompanyQuestion from "./pages/CompanyQuestion/View/CompanyQuestion";
import ListCompanyQuestions from "./pages/ListCompanyQuestions/View/ListCompanyQuestions";
import RoleQuestion from "./pages/RoleQuestion/View/RoleQuestion";
import ListRoleQuestion from "./pages/ListRoleQuestion/View/ListRoleQuestion";
import Applicants from "./pages/Applicants/View/Applicants";
import { SquareArrowUp } from "lucide-react";

const App = () => {
  const { location } = useAppContext();

  const [showTopBtn, setShowTopBtn] = useState(false);

  /* -------- Scroll to top on route change -------- */
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  /* -------- Show button when scrolling -------- */
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* -------- Scroll to top click -------- */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop={true} />

      {location.pathname !== "/login" && <Navbar />}

      <div className="min-h-screen w-full overflow-x-hidden antialiased">
        <div className="min-w-0">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/addjobs" element={<AddJob />} />
            <Route path="/list/jobs" element={<ListJobs />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/company-questions" element={<CompanyQuestion />} />
            <Route
              path="/list/company-questions"
              element={<ListCompanyQuestions />}
            />
            <Route path="/role-questions" element={<RoleQuestion />} />
            <Route path="/list/role-questions" element={<ListRoleQuestion />} />
            <Route path="/applicants" element={<Applicants />} />
          </Routes>
        </div>

        {showTopBtn && (
          <button
            onClick={scrollToTop}
            className="
            fixed bottom-6 right-6
             text-white
            p-3 rounded-full
            shadow-lg 
            transition-all duration-300
            cursor-pointer
            z-50
             bg-blue-400  hover:bg-blue-600
          "
          >
            <SquareArrowUp size={22} />
          </button>
        )}
      </div>
    </>
  );
};

export default App;
