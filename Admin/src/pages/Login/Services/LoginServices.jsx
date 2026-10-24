import { loginAdmin } from "../../../services/mutations";

/* -------- Handle Admin Login -------- */
export const loginAdminService = async (email, password, navigate) => {
  try {
    const data = await loginAdmin(email, password);

    if (!data?.success || data?.user?.role !== "admin") {
      return;
    }

    setTimeout(() => {
      navigate("/");
    }, 1500);
  } catch {
    //
  }
};
