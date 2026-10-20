// Jobvia / Client / src / context / AppContext.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "./appContext";

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const CURRENCY = import.meta.env.VITE_CURRENCY;

  const value = {
    navigate,
    location,
    CURRENCY,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
