import { useState } from "react";
import { BACKEND_URI } from "../config/config.ts";
import { useNavigate } from "react-router-dom";
import CircularProgress from "../components/ProgressBar.tsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { Upload03Icon } from "@hugeicons/core-free-icons";
function CreateQuiz() {
  1;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("public");
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

  const deleteQuestion = (qId) => {
    setQuestions((prev) =>
      prev.filter((question) => question.questionId !== qId),
    );
    setQuestions((prev) => {
      return prev.map((question, i) => {
        return { ...question, questionId: `q${i + 1}` };
      });
    });
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
  function handleSubmit() {
    const quiz = {
      title,
      description,
      questions,
      privacy,
    };
    console.log(quiz);
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl py-3 ">Create New Quiz</h1>
        <button
          onClick={handleSubmit}
          className="text-xl flex items-center gap-2 text-[#d1e2db] bg-[#03472b] px-5 py-2 sqc-md"
        >
          <HugeiconsIcon icon={Upload03Icon} size={17} />
          Upload
        </button>
      </div>
      <div className="flex *:py-5 *:px-10">
        <div className="flex-1 bg-white">
          <div className="flex flex-col">
            <input
              className="h-10 px-3 border-2 placeholder:text-[#a4a4a4] border-[#c4ccc8] w-7/10 rounded-md sqc-md"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Quiz title"
            />
            <textarea
              className=" placeholder:text-[#a4a4a4] border-2 border-[#c4ccc8] sqc-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Quiz description"
            ></textarea>
            <div>
              <h1 className="text-xl">Privacy</h1>
              <select
                value={privacy}
                onChange={(e) => {
                  setPrivacy(e.target.value);
                }}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-2/12">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-medium">Questions</h1>
            <div className="flex items-center gap-4">
              <button onClick={addQuestion}>Add Question</button>
            </div>
          </div>
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
                        <input
                          placeholder={`Option ${opt.optionId}`}
                          value={opt.text}
                          onChange={(e) => updateOption(i, oi, e.target.value)}
                        />
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
                <button onClick={() => deleteQuestion(question.questionId)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default CreateQuiz;
