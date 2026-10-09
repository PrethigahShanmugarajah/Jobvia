// Jobvia / Server / models / InterviewQuestion.js
import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewCompany",
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    keyPoints: {
      type: [String],
      default: [],
    },

    postDate: {
      type: Date,
      default: Date.now(),
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const InterviewQuestion = mongoose.model(
  "InterviewQuestion",
  interviewQuestionSchema,
);

export default InterviewQuestion;
