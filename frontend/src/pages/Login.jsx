import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

 return (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

    <div className="w-full max-w-md">

      <div className="text-center mb-8">

        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          🧠 PrepAI
        </h1>

        <p className="text-slate-500 mt-3">
          AI-powered interview preparation platform
        </p>

      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

        <h2 className="text-3xl font-bold text-slate-900">
          Welcome back
        </h2>

        <p className="text-slate-500 mt-2 mb-8">
          Sign in to continue your interview practice.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
          >
            Sign In
          </button>

        </form>

        <p className="text-center text-slate-500 mt-8">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-slate-900 hover:underline"
          >
            Create account
          </Link>

        </p>

      </div>

    </div>

  </div>
);
}

export default Login;