/* -------- Get Initial Company ID -------- */
export const getInitialCompanyId = (location, params, companies) => {
  return (
    location?.state?.companyId ||
    params?.companyId ||
    (companies?.length > 0 ? companies[0]._id : null)
  );
};
