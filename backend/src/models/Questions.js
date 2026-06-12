import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    followUps: [
      {
        type: String,
      },
    ],

    tags: [
      {
        type: String,
      },
    ],
    expectedKeywords: [
  {
    type: String,
  },
],
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model(
  "Question",
  questionSchema
);

export default Question;