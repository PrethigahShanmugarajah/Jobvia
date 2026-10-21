// Jobvia / Client / src / App.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/View/Home";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <ToastContainer autoClose={3000} newestOnTop={true} />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
