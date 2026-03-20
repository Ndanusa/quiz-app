import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URI } from "../config/config.js";

function TakeQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!id) return;
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`${BACKEND_URI}/api/v1/quiz/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Unable to load quiz");
          return;
        }
        setQuiz(data.data);
      } catch (err) {
        setError("Unable to load quiz");
      }
    };
    fetchQuiz();
  }, [id, token]);

  const onSubmit = async () => {
    try {
      const res = await fetch(`${BACKEND_URI}/api/v1/quiz/${id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Submission failed");
        return;
      }
      setResult(data.data);
      setError("");
    } catch {
      setError("Submission failed");
    }
  };

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  if (!quiz) {
    return <div className="p-4">Loading quiz...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] p-4">
      <div className="mx-auto max-w-3xl bg-white p-5 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold">{quiz.title}</h1>
        <p className="text-sm text-slate-500">{quiz.description}</p>
        <div className="mt-4 space-y-3">
          {quiz.questions.map((q) => (
            <div
              key={q.questionId}
              className="border border-slate-200 p-3 rounded-md">
              <p className="font-medium">{q.questionText}</p>
              <div className="mt-2 space-y-1">
                {q.options.map((o) => (
                  <label key={o.optionId} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={q.questionId}
                      checked={answers[q.questionId] === o.optionId}
                      onChange={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [q.questionId]: o.optionId,
                        }))
                      }
                    />
                    <span>{o.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="mt-3 px-3 py-2 rounded-md bg-black text-white"
          onClick={onSubmit}>
          Submit Quiz
        </button>
        {result && (
          <div className="mt-3 p-3 border rounded-md bg-green-50 text-green-800">
            You scored {result.correct} / {result.total}
          </div>
        )}
      </div>
    </div>
  );
}

export default TakeQuiz;
