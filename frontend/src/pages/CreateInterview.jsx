import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateInterview() {
  const navigate = useNavigate();

  const [loading, setLoading] =
  useState(false);


  const [uploadingResume, setUploadingResume] =
  useState(false);
  const [formData, setFormData] =
    useState({
      role: "",
      categories: [],
      difficulty: "Easy",
      totalQuestions: 3,
    });

  const categoriesList = [
  "React",
  "NodeJS",
  "MongoDB",
  "JavaScript",
  "HTML",
  "CSS",
  "Express",
  "Java",
  "Python",
  "SQL",
  "OOPs",
  "Collections",
  "Spring Boot",
  "Machine Learning",
  "Deep Learning",
  "Statistics",
  "Power BI",
  "Docker",
  "Kubernetes",
  "AWS",
  "Linux",
];

  const handleCategoryChange = (
    category
  ) => {
    if (
      formData.categories.includes(
        category
      )
    ) {
      setFormData({
        ...formData,
        categories:
          formData.categories.filter(
            (item) =>
              item !== category
          ),
      });
    } else {
      setFormData({
        ...formData,
        categories: [
          ...formData.categories,
          category,
        ],
      });
    }
  };

  const handleResumeUpload =
  async (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    try {

      setUploadingResume(true);

      const token =
        localStorage.getItem("token");

      const formDataObj =
        new FormData();

      formDataObj.append(
        "resume",
        file
      );

      const res =
        await api.post(
          "/resume/upload",
          formDataObj,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setFormData((prev) => ({
        ...prev,
        role: res.data.role,
        categories:
          res.data.skills,
      }));

    } catch (error) {

      console.error(error);

      alert(
        "Resume upload failed"
      );

    } finally {

      setUploadingResume(false);

    }
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem(
          "token"
        );
      setLoading(true);
      const res = await api.post(
        "/interviews/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate(
        `/interview/${res.data.interviewId}`
      );
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create interview"
      );
    }
    finally {

  setLoading(false);

}
  };

 const roles = [
  {
    name: "MERN Developer",
    categories: [
      "React",
      "NodeJS",
      "MongoDB",
      "JavaScript",
      "Express"
    ],
  },

  {
    name: "Frontend Developer",
    categories: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },

  {
    name: "Backend Developer",
    categories: [
      "NodeJS",
      "MongoDB",
      "Express",
      "SQL",
    ],
  },

  {
    name: "Java Developer",
    categories: [
      "Java",
      "OOPs",
      "Collections",
      "Spring Boot",
    ],
  },

  {
    name: "Python Developer",
    categories: [
      "Python",
      "OOPs",
      "SQL",
    ],
  },

  {
    name: "AI ML Engineer",
    categories: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "Statistics",
    ],
  },

  {
    name: "Data Analyst",
    categories: [
      "SQL",
      "Python",
      "Statistics",
      "Power BI",
    ],
  },

  {
    name: "DevOps Engineer",
    categories: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Linux",
    ],
  },
];

  return (
  <div className="min-h-screen bg-slate-50 p-8">

    <div className="max-w-7xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-slate-900">
          Create Interview
        </h1>

        <p className="text-slate-500 mt-2">
          Select a role, difficulty and number of questions.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

       <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-slate-200 rounded-3xl p-6 mb-8">

  <div className="flex items-center gap-4">

    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">
      📋
    </div>

    <div>
      <h3 className="text-xl font-bold text-slate-900">
        Upload Resume
      </h3>

      <p className="text-slate-500 text-sm">
        Let PrepAI detect your skills and generate smarter interview questions.
      </p>
    </div>

  </div>

  <input
    type="file"
    accept=".pdf"
    onChange={handleResumeUpload}
    className="mt-5 w-full border border-slate-300 rounded-xl p-3 bg-white"
  />

  {uploadingResume && (
    <p className="mt-3 text-slate-600">
      🤖 Analyzing Resume...
    </p>
  )}

</div>

        {/* Role Selection */}

        <div>

          <h3 className="mb-4 font-semibold text-slate-900">
            Select Role
          </h3>

          <div className="grid md:grid-cols-4 gap-4">

            {roles.map((role) => (
              <button
                key={role.name}
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    role: role.name,
                    categories:
                      role.categories,
                  })
                }
                className={`p-5 rounded-2xl border text-left transition ${
                  formData.role ===
                  role.name
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-900 border-slate-200 hover:border-slate-400"
                }`}
              >
                <p className="font-semibold">
                  {role.name}
                </p>
              </button>
            ))}

          </div>

        </div>

        {/* Categories */}

        <div>

          <h3 className="mb-4 font-semibold text-slate-900">
            Categories
          </h3>

          <div className="grid md:grid-cols-4 gap-3">

            {categoriesList.map(
              (category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(
                      category
                    )}
                    onChange={() =>
                      handleCategoryChange(
                        category
                      )
                    }
                  />

                  <span className="text-slate-700 text-sm">
                    {category}
                  </span>

                </label>
              )
            )}

          </div>

        </div>

        {/* Difficulty */}

        <div>

          <h3 className="mb-4 font-semibold text-slate-900">
            Difficulty
          </h3>

          <div className="flex gap-3">

            {[
              "Easy",
              "Medium",
              "Hard",
            ].map(
              (difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      difficulty,
                    })
                  }
                  className={`px-6 py-3 rounded-xl border transition ${
                    formData.difficulty ===
                    difficulty
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  {difficulty}
                </button>
              )
            )}

          </div>

        </div>

        {/* Questions Slider */}

        <div>

          <div className="flex justify-between mb-3">

            <h3 className="font-semibold text-slate-900">
              Questions
            </h3>

            <span className="font-bold text-slate-900">
              {formData.totalQuestions}
            </span>

          </div>

          <input
            type="range"
            min="1"
            max="10"
            value={
              formData.totalQuestions
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                totalQuestions:
                  Number(
                    e.target.value
                  ),
              })
            }
            className="w-full"
          />

        </div>

        {/* Summary */}

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">

          <h3 className="font-semibold text-slate-900 mb-3">
            Interview Summary
          </h3>

          <p className="text-slate-600">
            Role:{" "}
            {formData.role || "-"}
          </p>

          <p className="text-slate-600">
            Difficulty:{" "}
            {formData.difficulty}
          </p>

          <p className="text-slate-600">
            Questions:{" "}
            {
              formData.totalQuestions
            }
          </p>

        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-50"
        >
          {loading
            ? "🤖 Generating Questions..."
            : "Start Interview"}
        </button>

      </form>

    </div>

  </div>
);
}

export default CreateInterview;