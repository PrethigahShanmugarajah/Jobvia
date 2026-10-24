// Jobvia / Client / src / context / AppContext.jsx
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./appContext";

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const params = useParams();

  const { pathname } = location;

  const CURRENCY = import.meta.env.VITE_CURRENCY;

  const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

  const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE;

  const CONTACT_LOCATION = import.meta.env.VITE_CONTACT_LOCATION;

  const PORTFOLIO_URL = import.meta.env.VITE_PORTFOLIO_URL;

  const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

  const STORAGE_JOBS_KEY = import.meta.env.VITE_STORAGE_JOBS_KEY;

  const STORAGE_APPLIED_KEY = import.meta.env.VITE_STORAGE_APPLIED_KEY;

  const BASE_URL = import.meta.env.VITE_BASEURL;

  const STORAGE_QUESTIONS_KEY = import.meta.env.VITE_STORAGE_QUESTIONS_KEY;

  const value = {
    navigate,
    location,
    params,
    pathname,
    CURRENCY,
    CONTACT_EMAIL,
    CONTACT_PHONE,
    CONTACT_LOCATION,
    PORTFOLIO_URL,
    STORAGE_KEY,
    STORAGE_JOBS_KEY,
    STORAGE_APPLIED_KEY,
    BASE_URL,
    STORAGE_QUESTIONS_KEY,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
