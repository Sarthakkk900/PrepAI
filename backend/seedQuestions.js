import dotenv from "dotenv";
import mongoose from "mongoose";

import questions from "./data/questions.js";
import Question from "./src/models/Questions.js";

dotenv.config();

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Question.deleteMany();

    await Question.insertMany(questions);

    console.log("Questions Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedQuestions();