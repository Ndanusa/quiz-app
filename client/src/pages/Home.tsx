import { useRef, useState, useEffect } from "react";
import questions from "../data/data.json";
function Home() {
  const [answers, setAnswers] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleChange = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };
  const renderQuestions = () => {
    return questions.questions.map((question) => (
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
                onChange={() =>
                  handleChange(question.questionId, option.optionId)
                }
              />
              <p>{option.text}</p>
            </label>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-3">
        <div className="text-center ">
          <h1 className="text-2xl text-zinc-800">
            {questions.title} by{" "}
            <span className="">{questions.createdBy.username}</span>
          </h1>
          <p className="text-gray-700">{questions.description}</p>
        </div>
        <div>{renderQuestions()}</div>
      </div>
    </div>
  );
}

export default Home;
