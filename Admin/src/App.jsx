// Jobvia / Admin / src / App.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./context/appContext";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/View/Login";
import Dashboard from "./pages/Dashboard/View/Dashboard";

const App = () => {
  const { location } = useAppContext();

  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop={true} />

      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default App;
