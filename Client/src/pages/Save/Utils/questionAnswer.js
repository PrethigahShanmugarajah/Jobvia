/* -------- Get question answer -------- */
export const getQuestionAnswer = (question = {}) =>
  question.answer || question.answerParagraph || "";
