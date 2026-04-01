import { useState } from "react";
import { BACKEND_URI } from "../config/config.ts";
import { useNavigate } from "react-router-dom";
import CircularProgress from "../components/ProgressBar.tsx";
function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      points: 10,
      questionId: "q1",
      question: "",
      options: [
        { optionId: "A", text: "" },
        { optionId: "B", text: "" },
        { optionId: "C", text: "" },
        { optionId: "D", text: "" },
      ],
      correctAnswer: "A",
    },
  ]);
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        points: 10,
        questionId: `q${prev.length + 1}`,
        question: "",
        options: [
          { optionId: "A", text: "" },
          { optionId: "B", text: "" },
          { optionId: "C", text: "" },
          { optionId: "D", text: "" },
        ],
        correctAnswer: "A",
      },
    ]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    setQuestions((prev) => {
      const next = [...prev];
      const nextOpt = [...next[qIndex].options];
      nextOpt[optIndex] = { ...nextOpt[optIndex], text: value };
      next[qIndex].options = nextOpt;
      return next;
    });
  };

  return (
    <div>
      <div className="py-10">
        <CircularProgress
          label=""
          value={3}
          color="#000"
          stroke={20}
          rounded={false}
        />
      </div>
      <div>
        <h1 className="text-2xl text-center py-3 ">Create New Quiz</h1>
        <div className="flex flex-col">
          <input
            className="h-10 px-3 border-2 border-[#c8d0ce] rounded-md sqc-lg"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Quiz title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Quiz description"
          ></textarea>
        </div>
        <div>
          {questions.map((question, i) => {
            return (
              <div key={question.questionId}>
                <div>
                  <p>Question {i + 1}</p>
                  <span>{question.points} pts</span>
                </div>
                <input
                  type="text"
                  placeholder="Question text"
                  onChange={(e) => {
                    updateQuestion(i, "question", e.target.value);
                    console.log(question);
                  }}
                  value={question.question}
                />
                <div className="grid grid-cols-2">
                  {question.options.map((opt, oi) => {
                    return (
                      <div key={opt.optionId}>
                        <span>{opt.optionId}</span>
                        <input placeholder={`Option ${opt.optionId}`} />
                      </div>
                    );
                  })}
                </div>
                <div>
                  <p>Correct Option</p>
                  <select
                    value={question.correctAnswer}
                    onChange={(e) =>
                      updateQuestion(i, "correctAnswer", e.target.value)
                    }
                  >
                    {question.options.map((o) => {
                      return (
                        <option value={o.optionId} key={o.optionId}>
                          {o.optionId}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button onClick={addQuestion}>Add Question</button>
          <button>Save Quiz</button>
        </div>
      </div>
    </div>
  );
}
export default CreateQuiz;
