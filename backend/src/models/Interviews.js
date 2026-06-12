import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    categories: [
      {
        type: String,
      },
    ],

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    totalQuestions: {
      type: Number,
      default: 10,
    },

    score: {
      type: Number,
      default: 0,
    },

    assignedQuestions: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
  },
],

    currentQuestionIndex: {
  type: Number,
  default: 0,
},

    status: {
      type: String,
      enum: ["In Progress", "Completed"],
      default: "In Progress",
    },
  },
  {
    timestamps: true,
  }
);

const Interview = mongoose.model(
  "Interview",
  interviewSchema
);

export default Interview;