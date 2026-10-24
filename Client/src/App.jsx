// Jobvia / Client / src / App.jsx
import { useAppContext } from "./context/appContext";
import { useEffect, useLayoutEffect, useState } from "react";
import { SquareArrowUp } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/View/Home";
import SignIn from "./pages/SignIn/View/SignIn";
import SignUp from "./pages/SignUp/View/SignUp";
import FindJob from "./pages/FindJob/View/FindJob";
import JobDetails from "./pages/JobDetails/View/JobDetails";
import ViewProfile from "./pages/ViewProfile/View/ViewProfile";
import Company from "./pages/Company/View/Company";
import Role from "./pages/Role/View/Role";
import Save from "./pages/Save/View/Save";
import Contact from "./pages/Contact/View/Contact";
import Footer from "./components/Footer";

const ScrollToTopOnRouteChange = () => {
  const { pathname } = useAppContext();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      const prev = window.history.scrollRestoration;
      window.history.scrollRestoration = "manual";
      return () => {
        try {
          window.history.scrollRestoration = prev;
        } catch {
          //
        }
      };
    }
  }, []);

  useLayoutEffect(() => {
    try {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch {
      //
    }
  }, [pathname]);

  return null;
};

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.pageYOffset > 300);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center cursor-pointer rounded-full bg-blue-300 shadow-xl hover:bg-blue-400 active:scale-95 transition-all duration-300"
    >
      <SquareArrowUp size={22} />
    </button>
  );
};

const App = () => {
  const { pathname } = useAppContext();

  const hideLayout = ["/login", "/signup"].includes(pathname);

  return (
    <>
      <ScrollToTopOnRouteChange />

      <ToastContainer autoClose={3000} newestOnTop={true} />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/jobs" element={<FindJob />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/view-profile" element={<ViewProfile />} />
        <Route path="/companies" element={<Company />} />
        <Route path="/roles" element={<Role />} />
        <Route path="/roles/:roleSlug" element={<Role />} />
        <Route path="/saved" element={<Save />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {!hideLayout && <Footer />}

      <ScrollToTopButton />
    </>
  );
};

export default App;
