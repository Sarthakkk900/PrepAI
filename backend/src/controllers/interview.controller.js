import Interview from "../models/Interviews.js";
import Question from "../models/Questions.js";
import { generateQuestions }
from "../services/ai.service.js";


export const createInterview = async (
  req,
  res
) => {
  try {
    const {
      role,
      categories,
      difficulty,
      totalQuestions,
    } = req.body;

   let questions = [];

try {
  const aiQuestions =
    await generateQuestions(
      role,
      difficulty,
      totalQuestions
    );

  const savedQuestions =
    await Question.insertMany(
      aiQuestions.map((q) => ({
        question: q.question,

        category:
          categories[0] ||
          "General",

        difficulty,

        expectedKeywords: [],

        followUps: [],
      }))
    );

  questions = savedQuestions;

} catch (error) {
  console.log(
    "AI Failed. Using DB fallback..."
  );

  questions =
    await Question.aggregate([
      {
        $match: {
          category: {
            $in: categories,
          },
          difficulty,
        },
      },
      {
        $sample: {
          size: totalQuestions,
        },
      },
    ]);
}

   const interview = await Interview.create({
  userId: req.user.userId,
  role,
  categories,
  difficulty,
  totalQuestions,

  assignedQuestions: questions.map(
    (question) => question._id
  ),

  currentQuestionIndex: 0,
});
    res.status(201).json({
  success: true,

  interviewId: interview._id,

  currentQuestion: questions[0],

  currentQuestionNumber: 1,

  totalQuestions: questions.length,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
}
  };
  export const getCurrentQuestion = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const interview =
      await Interview.findById(id)
        .populate("assignedQuestions");

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }


    if (
  interview.currentQuestionIndex >=
  interview.assignedQuestions.length
) {
  return res.status(200).json({
    success: true,
    interviewCompleted: true,
    status: "Completed",
  });
}

    const currentQuestion =
      interview.assignedQuestions[
        interview.currentQuestionIndex
      ];

    res.status(200).json({
      success: true,

      currentQuestion,

      currentQuestionNumber:
        interview.currentQuestionIndex + 1,

      totalQuestions:
        interview.assignedQuestions.length,

      status: interview.status,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
