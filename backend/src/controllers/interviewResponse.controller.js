import InterviewResponse from "../models/InterviewResponse.js";
import Question from "../models/Questions.js";
import Interview from "../models/Interviews.js";
import Result from "../models/Result.js";
import generateFeedback from "../utils/generateFeedback.js";

// import { evaluateAnswer }
// from "../services/evaluateAnswer.service.js";

import {
  evaluateInterview
}
from "../services/evaluateInterview.service.js";

export const submitAnswer = async (
  req,
  res
) => {
  try {
    const {
      interviewId,
      questionId,
      answer,
    } = req.body;

    const question =
      await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const followUpQuestion =
      question.followUps.length > 0
        ? question.followUps[0]
        : "";

       const interview =
  await Interview.findById(
    interviewId
  ).populate("assignedQuestions");

//     const evaluation =
//   await evaluateAnswer(
//     question.question,
//     answer,
//     interview.role,
//     interview.difficulty
//   );

// const score =
//   evaluation.score;

   await InterviewResponse.create({
  interviewId,
  questionId,
  question: question.question,
  answer,
  followUpQuestion,

  score: 0,

  feedback: "",

  strengths: [],

  weaknesses: [],

  idealAnswer: "",
});
    // const interview =
    //   await Interview.findById(interviewId)
    //     .populate("assignedQuestions");

    interview.currentQuestionIndex += 1;

    if (
  interview.currentQuestionIndex >=
  interview.assignedQuestions.length
) {
  interview.status = "Completed";

  await interview.save();

  const responses =
    await InterviewResponse.find({
      interviewId,
    });

    const evaluations =
  await evaluateInterview(
    responses,
    interview.role,
    interview.difficulty
  );

  for (
  let i = 0;
  i < responses.length;
  i++
) {
  responses[i].score =
    evaluations[i]?.score || 0;

  responses[i].feedback =
    evaluations[i]?.feedback || "";

  responses[i].strengths =
    evaluations[i]?.strengths || [];

  responses[i].weaknesses =
    evaluations[i]?.weaknesses || [];

  responses[i].idealAnswer =
    evaluations[i]?.idealAnswer || "";

  await responses[i].save();
}

const updatedResponses =
  await InterviewResponse.find({
    interviewId,
  });

  const totalScore =
    updatedResponses.reduce(
      (sum, response) =>
        sum + response.score,
      0
    );

  const averageScore =
    Number(
      (
        totalScore /
        updatedResponses.length
      ).toFixed(1)
    );

  const percentage =
    Number(
      (
        (averageScore / 10) *
        100
      ).toFixed(1)
    );

  const feedback =
    generateFeedback(
      percentage
    );

  const result =
  await Result.create({
    userId: interview.userId,

    interviewId,

    role: interview.role,

    difficulty:
      interview.difficulty,

    totalQuestions:
      updatedResponses.length,

    score: averageScore,

    percentage,

    feedback,
  });

  return res.status(200).json({
    success: true,

    interviewCompleted: true,

    result,
  });
}

    await interview.save();

    const nextQuestion =
      interview.assignedQuestions[
        interview.currentQuestionIndex
      ];

    res.status(200).json({
      success: true,

      interviewCompleted: false,
      
      nextQuestion,

      currentQuestionNumber:
        interview.currentQuestionIndex + 1,

      totalQuestions:
        interview.assignedQuestions.length,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};