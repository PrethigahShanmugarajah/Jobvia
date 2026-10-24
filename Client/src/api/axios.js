import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL}/api`,
});

const STORAGE_KEY = import.meta.env.VITE_STORAGE_KEY;

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

    if (token || user?.token) {
      config.headers.Authorization = `Bearer ${token || user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
