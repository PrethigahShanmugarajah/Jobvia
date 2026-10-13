// Jobvia / Admin / src / context / AppContext.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "./appContext";

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const BASE_URL = import.meta.env.VITE_BASEURL;

  const value = {
    navigate,
    location,
    BASE_URL,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
