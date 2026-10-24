/* -------- Get available companies -------- */
export const getAvailableCompanies = (savedItems, companiesState) => {
  const companiesMap = new Map();

  savedItems.interviewQuestions.forEach((question) => {
    if (question.company && question.company._id) {
      companiesMap.set(
        String(question.company._id),
        question.company.companyName,
      );
    }
  });

  savedItems.jobs.forEach((job) => {
    const found = companiesState.find(
      (company) => company.companyName === job.companyName,
    );

    if (found) {
      companiesMap.set(String(found._id), found.companyName);
    }
  });

  return Array.from(companiesMap.entries()).map(([id, name]) => ({
    _id: id,
    companyName: name,
  }));
};
