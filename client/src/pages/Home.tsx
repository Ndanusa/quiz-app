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
    <div className="min-h-screen bg-[#f6f7fb] p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white sqx-3xl rounded-4xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8 space-y-4">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Quiz
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-2">
              {data.title}
            </h1>
            <p className="text-sm text-slate-500 mt-1">{data.description}</p>
          </div>

          <div className="sqc-2xl rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
                  Question {questionIndex + 1}/{questions.length}
                </p>
                <h2 className="text-lg font-semibold text-slate-800 mt-1">
                  {question.questionText}
                </h2>
              </div>
              <span className="text-xs font-medium text-slate-600 px-2 py-1 rounded-full bg-white border border-slate-200">
                {question.points} pts
              </span>
            </div>
            <div className="space-y-2">
              {question.options.map((option) => {
                const selected =
                  answers[question.questionId] === option.optionId;
                return (
                  <label
                    key={option.optionId}
                    className={`flex items-center gap-3 border sqc-2xl rounded-xl px-3 py-2 cursor-pointer transition ${selected ? "border-emerald-600 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <input
                      disabled={locked}
                      type="radio"
                      name={question.questionId}
                      value={option.optionId}
                      checked={selected}
                      className="accent-emerald-600"
                      onChange={() =>
                        handleChange(question.questionId, option.optionId)
                      }
                    />
                    <span
                      className={
                        selected
                          ? "text-slate-900 font-medium"
                          : "text-slate-700"
                      }>
                      {option.text}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                className="px-3 py-2 sqc-2xl rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
                onClick={() =>
                  setQuestionIndex((prev) =>
                    prev > 0 ? prev - 1 : questions.length - 1,
                  )
                }>
                Previous
              </button>
              <button
                className="px-3 py-2 sqc-2xl rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100"
                onClick={() =>
                  setQuestionIndex((prev) =>
                    prev < questions.length - 1 ? prev + 1 : 0,
                  )
                }>
                Next
              </button>
            </div>
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <button
                  key={`Question ${i + 1}`}
                  onClick={() => setQuestionIndex(i)}
                  className={`w-8 h-8 rounded-full text-xs ${questionIndex === i ? "bg-black text-white" : "bg-white text-black border border-slate-300"}`}>
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 sqc-2xl rounded-xl font-semibold transition ${allAnswered && !locked ? "bg-black text-white hover:bg-slate-900" : "bg-slate-200 text-slate-500 cursor-not-allowed"}`}
              onClick={verifyAnswers}
              disabled={!allAnswered || locked}>
              Verify Answers
            </button>
            <button
              className="px-4 py-2 sqc-2xl rounded-xl border border-black text-black bg-white hover:bg-slate-100"
              onClick={restartQuiz}>
              Restart Quiz
            </button>
          </div>

          {!allAnswered && !locked && (
            <p className="text-xs text-slate-500">
              Answer all questions before verifying.
            </p>
          )}
          {feedback && (
            <div
              className={`rounded-xl sqc-2xl p-2 text-sm ${score !== null ? "bg-emerald-50 text-emerald-800" : "bg-black text-white"}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
