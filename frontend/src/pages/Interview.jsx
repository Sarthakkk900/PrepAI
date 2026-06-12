import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Interview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questionData, setQuestionData] =
    useState(null);
    const [answer, setAnswer] =
  useState("");
  const [
  generatingReport,
  setGeneratingReport,
] = useState(false);

const [
  submittingAnswer,
  setSubmittingAnswer,
] = useState(false);

  const fetchQuestion = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
        `/interviews/${id}/current-question`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      

     if (res.data.interviewCompleted) {
  navigate(`/result/${id}`);
  return;
}

setQuestionData(res.data);

    } catch (error) {
      console.error(error);
    }
  };


 const handleSubmitAnswer = async () => {
  if (submittingAnswer) return;

setSubmittingAnswer(true);
  try {
    const token =
      localStorage.getItem("token");

      const isLastQuestion =
  questionData.currentQuestionNumber ===
  questionData.totalQuestions;

if (isLastQuestion) {
  setGeneratingReport(true);
}

    const res = await api.post(
      "/interviews/answer",
      {
        interviewId: id,
        questionId:
          questionData.currentQuestion._id,
        answer,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  if (res.data.interviewCompleted) {
  navigate(`/result/${id}`);
  return;
}

    setQuestionData({
      currentQuestion:
        res.data.nextQuestion,

      currentQuestionNumber:
        res.data.currentQuestionNumber,

      totalQuestions:
        res.data.totalQuestions,
    });

    setAnswer("");

  } catch (error) {
    console.error(error);
  }
   finally {

 setSubmittingAnswer(false);

}
};

useEffect(() => {
  fetchQuestion();
}, []);

if (generatingReport) {
  return (
    <div  className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">

      <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin mb-6"></div>

     <h1 className="text-4xl font-bold mb-4 text-slate-900">
        🤖 Generating Your Report
      </h1>

      <p className="text-slate-500 text-lg">
        This may take some time , please wait
      </p>

      <p className="text-slate-500 text-lg">
        Analyzing answers...
      </p>

     <p className="text-slate-500 text-lg">
        Finding strengths...
      </p>

      <p className="text-slate-500 text-lg">
        Finding weaknesses...
      </p>

    <p className="text-slate-500 text-lg">
        Creating ideal answers...
      </p>

    </div>
  );
}

if (!questionData) {
  return (
     <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">

      <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>

      <p className="mt-6 text-slate-500">
        Loading Interview...
      </p>

    </div>
  );
}

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center pt-16 px-6">

    <div className="  max-w-6xl w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full mb-6">

  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>

  <span className="text-sm text-slate-600">
    AI Interview Session
  </span>

</div>
  {/* Progress */}

  <div className="mb-8">

    <div className="flex justify-between items-center">

      <p className="text-slate-500 font-medium">
        Question {questionData.currentQuestionNumber} of {questionData.totalQuestions}
      </p>

      <p className="text-slate-400">
        {Math.round(
          (questionData.currentQuestionNumber /
            questionData.totalQuestions) *
            100
        )}
        %
      </p>

    </div>

    <div className="w-full bg-slate-200 rounded-full h-3 mt-4">

      <div
        className="bg-slate-900 h-3 rounded-full transition-all duration-500"
        style={{
          width: `${
            (questionData.currentQuestionNumber /
              questionData.totalQuestions) *
            100
          }%`,
        }}
      />

    </div>

  </div>

  {/* Question */}

  <div className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-6">

    <h2 className="text-3xl font-bold text-slate-900 leading-relaxed">
      {questionData.currentQuestion.question}
    </h2>

  </div>

  {/* Answer */}

  <textarea
    value={answer}
    onChange={(e) =>
      setAnswer(e.target.value)
    }
    placeholder="Write your answer here..."
    className="
w-full
mt-6
h-64
bg-white
border
border-slate-300
rounded-2xl
p-5
text-slate-900
resize-none
focus:outline-none
focus:ring-2
focus:ring-slate-900
"
  />

  <div className="flex justify-between items-center mt-2">

    <span className="text-slate-400 text-sm">
      Try to explain your answer clearly.
    </span>

    <span className="text-slate-500 text-sm">
      {answer.length} characters
    </span>

  </div>

  <button
    onClick={handleSubmitAnswer}
    disabled={
      submittingAnswer ||
      answer.trim() === ""
    }
    className="
mt-6
w-full
py-4
rounded-2xl
bg-slate-900
text-white
font-bold
hover:bg-slate-800
transition
disabled:opacity-50
disabled:cursor-not-allowed
"
>
   {submittingAnswer
  ? "Submitting..."
  : questionData.currentQuestionNumber ===
      questionData.totalQuestions
  ? "Finish Interview"
  : "Next Question →"}
  </button>

</div>
    </div>
  );
}

export default Interview;