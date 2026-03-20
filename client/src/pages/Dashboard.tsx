import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URI } from "../config/config.js";

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ total: 0 });
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
    <div className="min-h-screen bg-[#f6f8fc] p-4">
      <div className="mx-auto max-w-4xl bg-white rounded-2xl p-5 md:p-7 shadow">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-slate-600">
              Your quiz statistics and quick actions.
            </p>
          </div>
          <Link
            to="/create"
            className="px-3 py-2 rounded-lg bg-black text-white">
            Create Quiz
          </Link>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-200 p-3 bg-slate-50">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total quizzes
            </p>
            <p className="text-3xl font-bold text-black">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-3 bg-slate-50">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Take by ID
            </p>
            <div className="mt-2 flex gap-2">
              <input
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                placeholder="Quiz ID"
                className="w-full border border-slate-300 rounded-md px-2 py-1"
              />
              <button
                className="px-3 py-2 rounded-md bg-black text-white"
                onClick={goToQuiz}>
                Go
              </button>
            </div>
          </div>
        </div>

        {error && <div className="mt-3 text-red-600">{error}</div>}

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Your Quizzes</h2>
          {!quizzes.length ? (
            <p className="text-slate-500 mt-2">
              You have not created any quizzes yet.
            </p>
          ) : (
            <div className="mt-2 space-y-2">
              {quizzes.map((q) => (
                <div
                  key={q._id}
                  className="border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{q.title}</p>
                    <p className="text-xs text-slate-500">{q.description}</p>
                  </div>
                  <button
                    className="px-2 py-1 rounded-md bg-black text-white"
                    onClick={() => navigate(`/take/${q._id}`)}>
                    Take
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
