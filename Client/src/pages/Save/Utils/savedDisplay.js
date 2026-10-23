// Jobvia / Client / src / pages / Save / Utils / savedDisplay.js

/* -------- Filter and sort saved items -------- */
export const getCombinedSortedDisplay = (
  filteredSaved,
  jobSavedItems,
  focusRaw,
  uiFilter,
  uiFilterId,
  availableCompanies,
  availableRoles,
) => {
  const questionItems = filteredSaved;

  const filteredJobs = jobSavedItems.filter((item) => {
    if (uiFilter === "all") return true;
    if (!item.job) return false;

    if (uiFilter === "company") {
      if (!uiFilterId) return true;

      const target = availableCompanies.find(
        (c) => String(c._id) === String(uiFilterId),
      );

      if (!target) return false;

      return item.job.companyName === target.companyName;
    }

    if (uiFilter === "role") {
      if (!uiFilterId) return true;

      const target = availableRoles.find(
        (r) => String(r._id) === String(uiFilterId),
      );

      if (!target) return false;

      return item.job.roleName === target.roleName;
    }

    return true;
  });

  if (focusRaw) {
    const foundQuestions = questionItems.filter(
      (item) =>
        String(item.raw) === String(focusRaw) ||
        String(item.id) === String(focusRaw),
    );

    const foundJobs = filteredJobs.filter(
      (item) =>
        String(item.raw) === String(focusRaw) ||
        String(item.id) === String(focusRaw),
    );

    return [...foundJobs, ...foundQuestions];
  }

  const combined = [
    ...questionItems,
    ...filteredJobs.map((job) => ({ ...job })),
  ];

  combined.sort(
    (a, b) =>
      new Date(b.dateAdded || b.job?.datePosted) -
      new Date(a.dateAdded || a.job?.datePosted),
  );

  return combined;
};
