import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import AnalyticsChart from "../components/AnalyticsChart";

function Dashboard() {
  const navigate = useNavigate();

  const [history, setHistory] =
    useState(null);

    const [user, setUser] =
  useState(null);

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
  const fetchUser = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const res = await api.get(
      "/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      
    );

    console.log(
      "PROFILE RESPONSE:",
      res.data
    );


    setUser(res.data.user);
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchHistory();
     fetchUser();
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

          {/* Hero Section */}

          <div className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

              <div>

                <p className="text-slate-500 font-medium">
  Welcome 
</p>

<h1 className="text-5xl font-bold tracking-tight text-slate-900 mt-2">
  {user
    ? `Hi, ${user.name} 👋`
    : "Ready for your next interview?"}
</h1>

                {/* <h1 className="text-5xl font-bold tracking-tight text-slate-900 mt-2">
                  Ready for your next interview?
                </h1> */}

                <p className="text-slate-500 mt-4 text-lg max-w-2xl">
                  Practice technical interviews,
                  receive AI-powered feedback and
                  track your improvement over time.
                </p>

              </div>

              <div className="flex flex-col gap-3">

                <button
                  onClick={() =>
                    navigate(
                      "/create-interview"
                    )
                  }
                  className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                >
                  Start Interview
                </button>

                <button
                  onClick={() =>
                    navigate("/history")
                  }
                  className="px-6 py-3 rounded-2xl border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                >
                  View Reports
                </button>

              </div>

            </div>

          </div>

          {/* Stats Cards */}

         

           <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mt-8">

  <h2 className="text-3xl font-bold mb-6">
    Performance Summary
  </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">

            

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">

              <p className="text-slate-500 text-sm">
                🎯 Total Interviews
              </p>

              <h2 className="text-4xl font-bold mt-3 text-slate-900">
                {history.totalInterviews}
              </h2>

            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">

              <p className="text-slate-500 text-sm">
                📈 Average Score
              </p>

              <h2 className="text-4xl font-bold mt-3 text-slate-900">
                {history.averageScore}%
              </h2>

            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">

              <p className="text-slate-500 text-sm">
                🏆 Best Score
              </p>

              <h2 className="text-4xl font-bold mt-3 text-slate-900">
                {history.bestScore}%
              </h2>

            </div>

          </div>
      </div>    

          {/* Analytics */}

          <div className="mt-8">
            <AnalyticsChart
              results={history.results}
            />
          </div>

          {/* Quick Actions */}

          {/* <div className="grid md:grid-cols-2 gap-6 mt-8">

            <button
              onClick={() =>
                navigate(
                  "/create-interview"
                )
              }
              className="bg-white rounded-3xl p-6 border border-slate-200 text-left hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold">
                🎯 Start Interview
              </h3>

              <p className="text-slate-500 mt-2">
                Practice with AI-generated
                questions.
              </p>
            </button>

            <button
              onClick={() =>
                navigate("/history")
              }
              className="bg-white rounded-3xl p-6 border border-slate-200 text-left hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold">
                📚 View Reports
              </h3>

              <p className="text-slate-500 mt-2">
                Review strengths,
                weaknesses and ideal
                answers.
              </p>
            </button>

          </div> */}


          

          {/* Recent Interviews */}

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mt-8">

            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Recent Interviews
            </h2>

            {history.results.length ===
            0 ? (
              <div className="text-center py-10">

                <h3 className="text-xl font-semibold">
                  No interviews yet
                </h3>

                <p className="text-slate-500 mt-2">
                  Start your first AI
                  interview.
                </p>

              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">

                {history.results
                  .slice(0, 4)
                  .map((result) => (
                    <div
                      key={
                        result._id
                      }
                      className="border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
                    >
                      <p className="font-semibold text-lg">
                        {result.role}
                      </p>

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

                      <div className="mt-4 flex justify-between items-center">

                        <span className="font-bold text-xl">
                          {
                            result.percentage
                          }
                          %
                        </span>

                        <button
                          onClick={() =>
                            navigate(
                              `/result/${result.interviewId}`
                            )
                          }
                          className="text-slate-700 font-medium"
                        >
                          View →
                        </button>

                      </div>

                    </div>
                  ))}

              </div>
            )}

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;