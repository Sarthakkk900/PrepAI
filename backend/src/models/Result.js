import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },   
      

    interviewId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
    },


     role: {
  type: String,
  required: true,
},

difficulty: {
  type: String,
  required: true,
},

    totalQuestions: {
      type: Number,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    percentage: {
      type: Number,
      required: true,
    },

    feedback: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model(
  "Result",
  resultSchema
);

export default Result;