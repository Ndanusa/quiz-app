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
}
function Home() {
  // State Variables
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionIndex, setQuestionIndex] = useState(0);

  // Question Variables
  const questions: questionInterface[] = data.questions;
  const question = questions[questionIndex];

  // Handle Answer Storage
  const handleChange = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-3">
        <div className="text-center ">
          <h1 className="text-2xl text-zinc-800">
            {data.title} by <span className="">{data.createdBy.username}</span>
          </h1>
          <p className="text-gray-700">{data.description}</p>
        </div>
        <div>
          <div>
            <h1 className="font-bold text-xl">{question.questionId}</h1>
            <div key={question.questionId}>
              <p className="text-lg">{question.questionText}</p>
              {question.options.map((option) => (
                <label key={option.optionId} className="flex gap-2">
                  <input
                    type="radio"
                    name={question.questionId}
                    value={option.optionId}
                    checked={answers[question.questionId] === option.optionId}
                    onChange={() => {
                      handleChange(question.questionId, option.optionId);
                    }}
                  />
                  <p>{option.text}</p>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              questionIndex > 0
                ? setQuestionIndex(questionIndex - 1)
                : setQuestionIndex(questions.length - 1);
            }}>
            prev
          </button>
          <button
            onClick={() => {
              questionIndex < questions.length - 1
                ? setQuestionIndex(questionIndex + 1)
                : setQuestionIndex(0);
            }}>
            next
          </button>
        </div>
        <div className="flex itms-center justify-between">
          {questions.map((_, i) => {
            return (
              <button
                key={`Question ${i + 1}`}
                className="border-2 border-gray-700 relative flex items-center justify-center w-7 h-7 cursor-pointer"
                onClick={() => {
                  setQuestionIndex(i);
                }}>
                {i + 1}
              </button>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => {
              console.log(answers);
            }}>
            Get Answers
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
