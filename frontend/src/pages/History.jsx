import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] =
    useState(null);

  const navigate =
    useNavigate();

  const fetchHistory = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await api.get(
        "/results/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (!history) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <h1 className="text-2xl font-semibold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 p-8">

        <div className="max-w-7xl mx-auto">

          {/* Header */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-slate-900">
              Interview Reports
            </h1>

            <p className="text-slate-500 mt-2">
              Review previous interviews,
              strengths, weaknesses and
              AI-powered feedback.
            </p>

          </div>

          {/* Empty State */}

          {history.results.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">

              <h2 className="text-2xl font-bold">
                No Interviews Yet
              </h2>

              <p className="text-slate-500 mt-3">
                Start your first AI interview
                to generate reports and
                performance analytics.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/create-interview"
                  )
                }
                className="mt-6 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold"
              >
                Start Interview
              </button>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">

              {history.results.map(
                (result) => (
                  <div
                    key={result._id}
                    className="bg-white border border-slate-200 rounded-3xl p-6 hover:shadow-lg transition"
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <h2 className="text-xl font-bold text-slate-900">
                          {result.role}
                        </h2>

                        <p className="text-slate-500 mt-1">
                          {
                            result.difficulty
                          }
                        </p>

                        <p className="text-sm text-slate-400 mt-2">
                          {new Date(
                            result.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-3xl font-bold text-slate-900">
                          {
                            result.percentage
                          }
                          %
                        </p>

                        <p className="text-slate-500">
                          Score{" "}
                          {
                            result.score
                          }
                          /10
                        </p>

                      </div>

                    </div>

                    <div className="mt-6 flex items-center justify-between">

                      <span className="text-sm text-slate-500">
                        AI Interview Report
                      </span>

                      <button
                        onClick={() =>
                          navigate(
                            `/result/${result.interviewId}`
                          )
                        }
                        className="px-5 py-2 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
                      >
                        View Report →
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default History;