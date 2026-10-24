
/* -------- Transform saved questions -------- */
export const getUnifiedSavedQuestions = (savedItems) => {
  const results = [];

  savedItems.interviewQuestions.forEach((question) => {
    results.push({
      source: "company",
      id: question._id,
      q: {
        ...question,
        question: question.question,
        answer: question.answer,
        dateAdded: question.createdAt,
      },
      companies: question.company ? [question.company.companyName] : [],
      dateAdded: question.createdAt,
      raw: `company:${question._id}`,
    });
  });

  savedItems.roleQuestions.forEach((question) => {
    results.push({
      source: "role",
      id: question._id,
      q: {
        ...question,
        question: question.question,
        answer: question.answer,
        dateAdded: question.createdAt,
        answerParagraph: question.answer,
      },
      roleId: question.roleId
        ? typeof question.roleId === "object"
          ? question.roleId.roleName
          : question.roleId
        : null,
      dateAdded: question.createdAt,
      raw: `role:${question._id}`,
    });
  });

  return results;
};
