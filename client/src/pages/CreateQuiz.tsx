import { useState } from "react";
import { BACKEND_URI } from "../config/config.ts";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, Upload03Icon } from "@hugeicons/core-free-icons";
import DropdownMenu from "../component/Components.tsx";
function CreateQuiz() {
  const options = [
    { value: "private", label: "Private" },
    { value: "public", label: "Public" },
  ];
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
        <h1 className="text-3xl py-3 ">Create New Quiz</h1>
      </div>
      <div>
        <div>
          <button
            onClick={addQuestion}
            className="flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:text-[#4be086] text-[#0fcf5c] font-medium"
          >
            <HugeiconsIcon icon={PlusSignIcon} size={17} strokeWidth={2.2} />
            Add Question
          </button>
          <div className="flex flex-col bg-white border-2 border-[#e0e0e0] overflow-hidden sqc-lg">
            <div className="px-7 py-2 relative flex items-center justify-between bg-[#f4f8f6] border-b border-[#cacaca]">
              <h1 className="text-[18px] font-semibold">Quiz Details</h1>
              <button
                onClick={handleSubmit}
                className="flex items-center cursor-pointer gap-2 text-[#00b259]"
              >
                <HugeiconsIcon icon={Upload03Icon} size={16} />
                Upload
              </button>
            </div>
            <div className="px-7 py-5">
              <div>
                <h1 className="font-medium  pb-1 px-2">Privacy</h1>
                <DropdownMenu
                  options={options}
                  className="w-8/10 flex justify-between items-center px-4 py-2 bg-[#f1f5f2] border-2 border-[#e1eae5] sqc-md text-[#6a6a6a] hover:border-[#48c58a] focus:outline-none focus:ring-2 focus:ring-[#48c58a]"
                />
              </div>
              <h1 className="font-medium pt-3 pb-1 px-2">Title</h1>
              <input
                className="w-9/10 h-10 px-3 border-2 placeholder:text-[#909090] border-[#e1eae5] sqc-md hover:border-[#48c58a] focus:outline-none focus:ring-2 focus:ring-[#48c58a] bg-[#f6f9f7]"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Quiz title"
              />
              <h1 className="font-medium pt-3 pb-1 px-2">Description</h1>
              <textarea
                className="w-9/10 h-30 placeholder:text-[#909090] px-3 py-3 border-2 border-[#e1eae5] sqc-md hover:border-[#48c58a]  focus:outline-none focus:ring-2 focus:ring-[#48c58a] bg-[#f6f9f7]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Quiz description"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-white px-20 py-5 shadow-lg sqc-4xl mt-10">
          <h1 className="text-2xl font-medium relative flex items-center">
            {" "}
            <div className="absolute top-0 bottom-0 w-1 rounded-xl bg-linear-to-b from-[#287551] to-[#00ff88] left-0"></div>
            <span className="px-2.5"> Questions</span>
          </h1>
          {questions.map((question, i) => {
            return (
              <div key={question.questionId} className="flex-">
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
