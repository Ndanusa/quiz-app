import { useRef, useState, useEffect } from "react";
import data from "../data/data.json";
interface questionOptionInterface {
  optionId: string;
  text: string;
}
interface questionInterface {
  questionId: string;
  questionText: string;
  points: number;
  options: questionOptionInterface[];
  correctAnswer: string;
}
interface loggedInUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  id: string;
  password: string;
}
function Home({ validUser }: { validUser: loggedInUser }) {
  // State Variables
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [locked, setLocked] = useState(false);

  // Question Variables
  const questions: questionInterface[] = data.questions;
  const question = questions[questionIndex];
  const allAnswered = questions.every((q) => !!answers[q.questionId]);

  // Handle Answer Storage
  const handleChange = (questionId: string, optionId: string) => {
    if (locked) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const verifyAnswers = () => {
    const unanswered = questions.filter((q) => !answers[q.questionId]).length;
    if (unanswered > 0) {
      setScore(null);
      setLocked(false);
      setFeedback(
        `Please answer all ${questions.length} questions before verifying. ${unanswered} question(s) remain unanswered.`,
      );
      return;
    }

    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.questionId] === q.correctAnswer) {
        correct += 1;
      }
    });
    setScore(correct);
    setLocked(true);
    setFeedback(`You got ${correct} out of ${questions.length} correct.`);
  };

  const restartQuiz = () => {
    setAnswers({});
    setQuestionIndex(0);
    setScore(null);
    setFeedback("");
    setLocked(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/90 border border-slate-200 rounded-2xl shadow-xl p-5 md:p-8 space-y-5">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Quiz challenge
          </p>
          <h1 className="text-3xl font-bold text-slate-800 mt-2">
            {data.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1">{data.description}</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs uppercase text-gray-500">
                Question {questionIndex + 1} of {questions.length}
              </p>
              <h2 className="text-xl font-semibold text-slate-800 mt-1">
                {question.questionText}
              </h2>
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
              {question.points} pts
            </span>
          </div>
          <div className="space-y-2">
            {question.options.map((option) => {
              const selected = answers[question.questionId] === option.optionId;
              return (
                <label
                  key={option.optionId}
                  className={`flex items-center gap-3 border rounded-lg px-3 py-2 cursor-pointer transition ${
                    selected
                      ? "border-blue-500 bg-blue-50 shadow"
                      : "border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50"
                  }`}>
                  <input
                    disabled={locked}
                    className="accent-blue-600"
                    type="radio"
                    name={question.questionId}
                    value={option.optionId}
                    checked={selected}
                    onChange={() =>
                      handleChange(question.questionId, option.optionId)
                    }
                  />
                  <span
                    className={`text-sm ${selected ? "text-slate-900 font-medium" : "text-slate-700"}`}>
                    {option.text}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            className="px-3 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
            onClick={() => {
              setQuestionIndex((prev) =>
                prev > 0 ? prev - 1 : questions.length - 1,
              );
            }}>
            Previous
          </button>
          <button
            className="px-3 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition"
            onClick={() => {
              setQuestionIndex((prev) =>
                prev < questions.length - 1 ? prev + 1 : 0,
              );
            }}>
            Next
          </button>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, i) => (
              <button
                key={`Question ${i + 1}`}
                className={`w-8 h-8 rounded-full border transition ${
                  questionIndex === i
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-300 hover:border-blue-400"
                }`}
                onClick={() => setQuestionIndex(i)}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition ${allAnswered && !locked ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-slate-600 cursor-not-allowed"}`}
            onClick={verifyAnswers}
            disabled={!allAnswered || locked}>
            Verify Answers
          </button>
          <button
            className="px-4 py-2 rounded-lg font-semibold bg-slate-600 text-white hover:bg-slate-700 transition"
            onClick={restartQuiz}>
            Restart Quiz
          </button>
          {!allAnswered && !locked && (
            <p className="text-xs text-amber-700 mt-1 w-full">
              Answer all {questions.length} questions first.
            </p>
          )}
          {feedback && (
            <div
              className={`mt-2 rounded-md p-2 text-sm w-full ${score !== null ? "bg-emerald-100 text-emerald-800" : allAnswered ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
