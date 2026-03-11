import { useRef, useState, useEffect } from "react";
import data from "../data/data.json";
function Home() {
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = data.questions[questionIndex];
  const handleChange = (questionId, optionId) => {
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
                : setQuestionIndex(data.questions.length - 1);
            }}>
            prev
          </button>
          <button
            onClick={() => {
              questionIndex < data.questions.length - 1
                ? setQuestionIndex(questionIndex + 1)
                : setQuestionIndex(0);
            }}>
            next
          </button>
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
