import { persistAppliedJobs } from "./storage";

/* -------- Track applied jobs -------- */
export const applyJobOnce = (jobId, setAppliedJobs, STORAGE_APPLIED_KEY) => {
  setAppliedJobs((prev) => {
    const idStr = String(jobId);

    if (prev.includes(idStr)) return prev;

    const next = [...prev, idStr];
    persistAppliedJobs(STORAGE_APPLIED_KEY, next);

    return next;
  });
};

/* -------- Load applied jobs -------- */
export const getAppliedJobs = (STORAGE_APPLIED_KEY) => {
  try {
    const raw = localStorage.getItem(STORAGE_APPLIED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};
