import { useState } from "react";
import { BACKEND_URI } from "../config/config.js";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionId: "q1",
      questionText: "",
      points: 1,
      options: [
        { optionId: "a", text: "" },
        { optionId: "b", text: "" },
      ],
      correctAnswer: "a",
    },
  ]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const updateQuestion = (index, field, value) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateOption = (qIndex, optIndex, value) => {
    setQuestions((prev) => {
      const next = [...prev];
      const options = [...next[qIndex].options];
      options[optIndex] = { ...options[optIndex], text: value };
      next[qIndex].options = options;
      return next;
    });
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        questionId: `q${prev.length + 1}`,
        questionText: "",
        points: 1,
        options: [
          { optionId: "a", text: "" },
          { optionId: "b", text: "" },
        ],
        correctAnswer: "a",
      },
    ]);
  };

  const handleSubmit = async () => {
    if (!token) return setMessage("Login first.");
    if (!title.trim() || !description.trim())
      return setMessage("Add title and description.");
    try {
      const res = await fetch(`${BACKEND_URI}/api/v1/quiz`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, questions }),
      });
      const data = await res.json();
      if (!res.ok) return setMessage(data.message || "Create failed");
      setMessage("Quiz created successfully. ID: " + data.data._id);
      navigate(`/take/${data.data._id}`);
    } catch (error) {
      setMessage("Unable to create quiz");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc] p-4">
      <div className="mx-auto max-w-3xl bg-white p-6 md:p-8 rounded-2xl sqc-2xl shadow-lg">
        <h1 className="text-2xl font-semibold">Create New Quiz</h1>
        <div className="mt-3 space-y-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Quiz title"
            className="w-full border border-slate-300 rounded-md sqc-md px-3 py-2"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Quiz description"
            className="w-full border border-slate-300 rounded-md sqc-md px-3 py-2"></textarea>
        </div>

        <div className="mt-4 space-y-4">
          {questions.map((q, i) => (
            <div
              key={q.questionId}
              className="border border-slate-200 rounded-xl sqc-xl p-3 bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium">Question {i + 1}</p>
                <span className="text-xs px-2 py-1 rounded sqc-sm bg-black text-white">
                  {q.points} pts
                </span>
              </div>
              <input
                value={q.questionText}
                onChange={(e) =>
                  updateQuestion(i, "questionText", e.target.value)
                }
                placeholder="Question text"
                className="w-full border border-slate-300 rounded-md sqc-md px-2 py-1"
              />
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                {q.options.map((opt, oi) => (
                  <div className="flex gap-1 items-center" key={opt.optionId}>
                    <span className="w-5 text-xs">{opt.optionId}</span>
                    <input
                      value={opt.text}
                      onChange={(e) => updateOption(i, oi, e.target.value)}
                      placeholder={`Option ${opt.optionId}`}
                      className="w-full border border-slate-300 rounded-md sqc-md px-2 py-1"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <label className="text-xs text-slate-600">Correct option</label>
                <select
                  value={q.correctAnswer}
                  onChange={(e) =>
                    updateQuestion(i, "correctAnswer", e.target.value)
                  }
                  className="w-full border border-slate-300 rounded-md sqc-md px-2 py-1 mt-1">
                  {q.options.map((o) => (
                    <option key={o.optionId} value={o.optionId}>
                      {o.optionId}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={addQuestion}
            className="px-3 py-2 rounded-md sqc-md bg-black text-white">
            Add Question
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-2 rounded-md sqc-md bg-emerald-600 text-white">
            Save Quiz
          </button>
        </div>
        {message && (
          <div className="mt-2 text-sm text-slate-700">{message}</div>
        )}
      </div>
    </div>
  );
}

export default CreateQuiz;
