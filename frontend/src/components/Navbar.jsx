import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">

      <div className="max-w-6xl mx-auto px-8 py-4 flex flex-wrap  justify-between gap-2 items-center">

        <div
          onClick={() =>
            navigate("/dashboard")
          }
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="text-2xl">
            🧠
          </span>

          <h1 className="text-2xl font-bold tracking-tight">
            PrepAI
          </h1>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/history")
            }
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            History
          </button>

          {/* <button
            onClick={() =>
              navigate(
                "/create-interview"
              )
            }
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            New Interview
          </button> */}

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl  text-slate-700 hover:bg-slate-100 transition"
          >
            Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;