import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();

 const [result, setResult] =
  useState(null);

const [responses, setResponses] =
  useState([]);
  const fetchResult = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
  `/results/details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(res.data.result);

setResponses(
  res.data.responses
);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-black">
        Loading Result...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
    <div className="max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-sm">

  <div className="text-center">

    <p className="text-slate-500 mb-3 text-4xl ">
      Interview Report
    </p>

    <h1 className="text-6xl font-bold text-slate-900">
      {result.percentage}%
    </h1>

    <p className="text-xl text-slate-500 mt-3">
      {result.feedback}
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-6 mt-10">

    <div className="bg-slate-50 rounded-2xl p-6 text-center">

      <p className="text-slate-500">
        Average Score
      </p>

      <h2 className="text-4xl font-bold mt-2 text-slate-900">
        {result.score}
      </h2>

    </div>

    <div className="bg-slate-50 rounded-2xl p-6 text-center">

      <p className="text-slate-500">
        Questions
      </p>

      <h2 className="text-4xl font-bold mt-2 text-slate-900">
        {responses.length}
      </h2>

    </div>

    <div className="bg-slate-50 rounded-2xl p-6 text-center">

      <p className="text-slate-500">
        Performance
      </p>

      <h2 className="text-4xl font-bold mt-2 text-slate-900">
        {result.percentage >= 70
          ? "Good"
          : result.percentage >= 50
          ? "Average"
          : "Needs Work"}
      </h2>

    </div>

  </div>



          <div className="mt-10">
  <h2 className="text-2xl font-bold mb-6">
    Question Review
  </h2>

  <div className="space-y-6">

    {responses.map(
      (response, index) => (
        <div
          key={response._id}
         className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
        >
          <h3 className="font-bold text-xl mb-4">
            Question {index + 1}
          </h3>

          <p className="mb-4 ">
            {response.question}
          </p>

          <div className="mb-4">
  <h4 className="font-semibold mb-2">
    Your Answer
  </h4>

  <div  className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-700">
    {response.answer ||
      "No answer submitted"}
  </div>
</div>

          <div className="mb-4">
            <span className="text-slate-400">
              Score:
            </span>{" "}
            {response.score}/10
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-green-400 mb-2">
              Strengths
            </h4>

            <ul className="list-disc ml-6">
              {response.strengths?.map(
                (item, i) => (
                  <li key={i}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-yellow-400 mb-2">
              Areas To Improve
            </h4>

            <ul className="list-disc ml-6">
              {response.weaknesses?.map(
                (item, i) => (
                  <li key={i}>
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sky-400 mb-2">
              Ideal Answer
            </h4>

            <p className="text-slate-800">
              {response.idealAnswer}
            </p>
          </div>

        </div>
      )
    )}

  </div>
</div>

          <div className="mt-8 flex gap-4">

  <button
    onClick={() =>
      navigate("/dashboard")
    }
    className="px-6 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
  >
    Dashboard
  </button>

  <button
    onClick={() =>
      navigate("/create-interview")
    }
    className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold hover:bg-slate-100">
    Start Another Interview
  </button>

</div>

        </div>

      </div>

    </div>
  );
}

export default Result;