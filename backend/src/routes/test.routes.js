import express from "express";
import { generateQuestions } from "../services/ai.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const questions = await generateQuestions(
      "MERN Stack Developer",
      "Medium",
      5
    );

    res.json(questions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;