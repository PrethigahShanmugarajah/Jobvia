// Jobvia / Client / src / pages / Save / Utils / savedFilter.js

/* -------- Filter saved questions -------- */
export const filterSavedQuestions = (
  unifiedSaved,
  uiFilter,
  uiFilterId,
  availableRoles,
  availableCompanies,
) =>
  unifiedSaved.filter((item) => {
    if (uiFilter === "all") return true;

    if (uiFilter === "company") {
      if (item.source !== "company") return false;
      if (!uiFilterId) return true;

      const target = availableCompanies.find(
        (c) => String(c._id) === String(uiFilterId),
      );

      if (!target) return false;

      return (
        String(item.q.company?._id || item.q.company) === String(target._id) ||
        item.q.company?.companyName === target.companyName
      );
    }

    if (uiFilter === "role") {
      if (item.source !== "role") return false;
      if (!uiFilterId) return true;

      const target = availableRoles.find(
        (r) => String(r._id) === String(uiFilterId),
      );

      if (!target) return false;

      return (
        String(item.q.roleId?._id || item.q.roleId) === String(target._id) ||
        item.q.roleId?.roleName === target.roleName
      );
    }

    return true;
  });
