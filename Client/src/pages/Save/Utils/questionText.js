// Jobvia / Client / src / pages / Save / Utils / questionText.js

/* -------- Remove numbering from question text -------- */
export const cleanQuestionText = (question = "") =>
  question.replace(/^\d+\.\s*/, "");
