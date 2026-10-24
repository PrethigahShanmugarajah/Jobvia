import mongoose from "mongoose";

const roleQuestionSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewRole",
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

    keyPoints: [
      {
        type: String,
      },
    ],

    askedBy: [
      {
        companyName: String,
        dateAsked: String,
      },
    ],
  },
  { timestamps: true },
);

const RoleQuestion = mongoose.model("RoleQuestion", roleQuestionSchema);

export default RoleQuestion;
