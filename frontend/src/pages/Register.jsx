import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    branch: "",
    graduationYear: "",
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
        "/auth/register",
        formData
      );

      alert(res.data.message);

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

 return (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

    <div className="w-full max-w-3xl">

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
          Create account
        </h2>

        <p className="text-slate-500 mt-2 mb-8">
          Start your interview preparation journey.
        </p>

        <form
  onSubmit={handleSubmit}
  className="grid md:grid-cols-2 gap-4"
>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />

          <input
            type="text"
            name="college"
            placeholder="College"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />

          <input
            type="number"
            name="graduationYear"
            placeholder="Graduation Year"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />

          <div className="md:col-span-2">
  <button
    type="submit"
    className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
  >
    Create Account
  </button>
</div>

        </form>

        <div className="md:col-span-2">
  <p className="text-center text-slate-500 mt-2">
    Already have an account?{" "}
    <Link
      to="/"
      className="font-semibold text-slate-900 hover:underline"
    >
      Sign In
    </Link>
  </p>
</div>

      </div>

    </div>

  </div>
);
}

export default Register;