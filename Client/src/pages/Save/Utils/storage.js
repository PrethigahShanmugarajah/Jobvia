// Jobvia / Client / src / pages / Save / Utils / storage.js

/* -------- Persist applied jobs -------- */
export const persistAppliedJobs = (storageKey, jobs) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(jobs));
  } catch (error) {
    console.error("Failed to persist applied jobs", error);
  }
};
