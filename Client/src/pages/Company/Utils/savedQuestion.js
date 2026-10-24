/* -------- Get Saved Question IDs From Local Storage -------- */
export const getStoredSavedIds = (STORAGE_QUESTIONS_KEY) => {
  try {
    const raw = localStorage.getItem(STORAGE_QUESTIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* -------- Parse Saved Question IDs From Storage Event -------- */
export const parseSavedIds = (value) => {
  try {
    const parsed = value ? JSON.parse(value) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* -------- Toggle Saved Question ID -------- */
export const toggleSavedId = (savedIds, id) => {
  return savedIds.includes(id)
    ? savedIds.filter((savedId) => savedId !== id)
    : [...savedIds, id];
};
