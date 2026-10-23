// Jobvia / Client / src / pages / Save / Utils / questionAnswer.js

/* -------- Get question answer -------- */
export const getQuestionAnswer = (question = {}) =>
  question.answer || question.answerParagraph || "";
