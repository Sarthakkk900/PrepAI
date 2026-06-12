import Result from "../models/Result.js";
import InterviewResponse
from "../models/InterviewResponse.js";

export const getResult = async (
  req,
  res
) => {
  try {
    const { interviewId } =
      req.params;

    const result =
      await Result.findOne({
        interviewId,
      });

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Result not found",
      });
    }

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDetailedResult =
async (req, res) => {
  try {
    const { interviewId } =
      req.params;

    const result =
      await Result.findOne({
        interviewId,
      });

    if (!result) {
      return res.status(404).json({
        success: false,
        message:
          "Result not found",
      });
    }

    const responses =
      await InterviewResponse.find({
        interviewId,
      });

    res.status(200).json({
      success: true,

      result,

      responses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHistory = async (
  req,
  res
) => {
  try {
    const results =
      await Result.find({
         userId: req.user.userId,
      }).sort({
        createdAt: -1,
      });

    const totalInterviews =
      results.length;

    const averageScore =
      totalInterviews > 0
        ? (
            results.reduce(
              (sum, result) =>
                sum +
                result.percentage,
              0
            ) /
            totalInterviews
          ).toFixed(1)
        : 0;

    const bestScore =
      totalInterviews > 0
        ? Math.max(
            ...results.map(
              (result) =>
                result.percentage
            )
          )
        : 0;

    res.status(200).json({
      success: true,

      totalInterviews,

      averageScore,

      bestScore,

      results,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};