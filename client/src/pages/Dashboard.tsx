import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Plus,
  Settings01Icon,
  LockPasswordIcon,
} from "@hugeicons/core-free-icons";
import { BACKEND_URI } from "../config/config.js";

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0 });
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${BACKEND_URI}/api/v1/quiz/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to load quizzes");
          return;
        }
        setQuizzes(data.data || []);
        setStats({ total: data.data?.length || 0 });
      } catch {
        setError("Unable to load dashboard");
      }
    };
    load();
  }, [token]);

  const goToQuiz = () => {
    if (!quizId.trim()) return;
    navigate(`/take/${quizId.trim()}`);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      <div className="bg-white border-b border-slate-200 p-3 md:p-5">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Quick Dashboard
            </p>
            <h1 className="text-2xl font-semibold">Quiz Admin</h1>
          </div>
          <div className="flex gap-2">
            <Link
              to="/create"
              className="px-3 py-2 bg-black text-white rounded-md sqc-md">
              Create
            </Link>
            <Link
              to="/settings"
              className="px-3 py-2 border border-slate-300 rounded-md sqc-md">
              Settings
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="grid md:grid-cols-[220px_1fr] gap-4">
          <aside className="bg-black text-white p-4 md:p-6 sticky top-4 self-start">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                Quiz App
              </p>
              <h1 className="text-xl font-semibold mt-1">Dashboard</h1>
            </div>
            <nav className="space-y-2">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg sqc-lg ${active === "dashboard" ? "bg-emerald-500" : "hover:bg-slate-800"}`}
                onClick={() => setActive("dashboard")}>
                <HugeiconsIcon icon={Home01Icon} size={16} color="white" />
                Overview
              </Link>
              <Link
                to="/create"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg sqc-lg ${active === "create" ? "bg-emerald-500" : "hover:bg-slate-800"}`}
                onClick={() => setActive("create")}>
                <HugeiconsIcon icon={Plus} size={16} color="white" />
                Create Quiz
              </Link>
              <Link
                to="/settings"
                className={`flex items-center gap-2 px-3 py-2 rounded-lg sqc-lg ${active === "settings" ? "bg-emerald-500" : "hover:bg-slate-800"}`}
                onClick={() => setActive("settings")}>
                <HugeiconsIcon
                  icon={LockPasswordIcon}
                  size={16}
                  color="white"
                />
                Settings
              </Link>
            </nav>
          </aside>

          <main className="p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">
                  Overview
                </h2>
                <p className="text-slate-500 text-sm">
                  Stats and quick actions for your quizzes.
                </p>
              </div>
              <Link
                to="/create"
                className="px-3 py-2 rounded-md sqc-md bg-emerald-700 text-white">
                New Quiz
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl sqc-xl border border-slate-200 p-3 bg-emerald-50">
                <p className="text-xs uppercase text-slate-500">
                  Total quizzes
                </p>
                <p className="text-3xl font-bold text-black">{stats.total}</p>
              </div>
              <div className="rounded-xl sqc-xl border border-slate-200 p-3 bg-slate-50">
                <p className="text-xs uppercase text-slate-500">Take by ID</p>
                <div className="mt-2 flex gap-2">
                  <input
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                    placeholder="Quiz ID"
                    className="flex-1 border border-slate-300 rounded-md sqc-md px-2 py-1.5"
                  />
                  <button
                    className="px-3 py-2 rounded-md sqc-md bg-black text-white"
                    onClick={goToQuiz}>
                    Go
                  </button>
                </div>
              </div>
            </div>

            {error && <div className="mb-3 text-red-600">{error}</div>}

            <div className="border border-slate-200 rounded-xl sqc-xl p-3 bg-white">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">Your Quizzes</h3>
                <span className="text-xs text-slate-500">
                  {quizzes.length} items
                </span>
              </div>
              {!quizzes.length ? (
                <p className="text-slate-500">
                  No quizzes found yet. Create one to begin.
                </p>
              ) : (
                <div className="space-y-2">
                  {quizzes.map((q) => (
                    <div
                      key={q._id}
                      className="flex items-center justify-between gap-3 border border-slate-200 rounded-lg sqc-lg p-2">
                      <div>
                        <p className="font-medium text-slate-800">{q.title}</p>
                        <p className="text-xs text-slate-500">
                          {q.description}
                        </p>
                      </div>
                      <button
                        className="px-2 py-1 rounded-md sqc-md bg-black text-white"
                        onClick={() => navigate(`/take/${q._id}`)}>
                        Take
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
