import { useRef, useState, useEffect } from "react";
import questions from "../data/data.json";
function Home() {
  const [answers, setAnswers] = useState({});

  const handleChange = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  return (
    <div>
      {questions.questions.map((question) => (
        <div key={question.questionId}>
          <p>{question.questionText}</p>

          {question.options.map((option) => (
            <label key={option.optionId}>
              <input
                type="radio"
                name={question.questionId}
                value={option.optionId}
                checked={answers[question.questionId] === option.optionId}
                onChange={() =>
                  handleChange(question.questionId, option.optionId)
                }
              />
              {option.text}
            </label>
          ))}
        </div>
      ))}

      <p>Answers: {JSON.stringify(answers)}</p>
    </div>
  );
}

export default Home;
