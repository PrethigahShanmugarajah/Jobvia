// Jobvia / Client / src / App.jsx
import { useAppContext } from "./context/appContext";
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
import Footer from "./components/Footer";

const App = () => {
  const { location } = useAppContext();

  const hideLayout = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop={true} />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/jobs" element={<FindJob />} />
        <Route path="/job-details/:id" element={<JobDetails />} />
        <Route path="/view-profile" element={<ViewProfile />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
