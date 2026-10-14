// Jobvia / Admin / src / context / AppContext.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "./appContext";

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const BASE_URL = import.meta.env.VITE_BASEURL;

  const CURRENCY = import.meta.env.VITE_CURRENCY;

  const value = {
    navigate,
    location,
    BASE_URL,
    CURRENCY,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
