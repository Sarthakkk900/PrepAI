import mongoose from "mongoose";

const interviewResponseSchema =
  new mongoose.Schema(
    {
      interviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
        required: true,
      },

      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },

      question: {
        type: String,
        required: true,
      },

      answer: {
        type: String,
        default: "",
      },

      followUpQuestion: {
        type: String,
        default: "",
      },

      score: {
        type: Number,
        default: 0,
      },

      feedback: {
        type: String,
        default: "",
      },
      strengths: [
  {
    type: String,
  },
],

weaknesses: [
  {
    type: String,
  },
],

idealAnswer: {
  type: String,
  default: "",
},
    },
    {
      timestamps: true,
    }
  );

const InterviewResponse =
  mongoose.model(
    "InterviewResponse",
    interviewResponseSchema
  );

export default InterviewResponse;