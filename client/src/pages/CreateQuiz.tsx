import { useState, useRef, useEffect } from "react";
import { BACKEND_URI } from "../config/config.ts";
import { useNavigate } from "react-router-dom";
import CircularProgress from "../components/ProgressBar.tsx";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowDownDoubleIcon,
  ArrowUpDoubleIcon,
  PlusMinus01Icon,
  PlusSignCircleIcon,
  PlusSignIcon,
  PlusSignSquareIcon,
  Upload03Icon,
} from "@hugeicons/core-free-icons";
function CreateQuiz() {
  const options = [
    { value: "private", label: "Private" },
    { value: "public", label: "Public" },
  ];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [isVisible, setIsVisible] = useState(false);
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
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const ref = useRef();

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 200); // match duration
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
          className=" flex items-center cursor-pointer gap-2 bg-[#c3ffe2] text-[#24ad6d] transition-colors duration-300 hover:bg-[#8effc9] hover:text-[#0a6f40] px-5 py-2 sqc-md"
        >
          <HugeiconsIcon icon={Upload03Icon} size={17} />
          Upload
        </button>
      </div>
      <div>
        <div className="flex flex-wrap *:px-5 *:py-10 *:bg-white gap-4 *:shadow-lg">
          <div className="flex-1 sqc-lg">
            <button
              onClick={addQuestion}
              className="flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:text-[#4be086] text-[#0fcf5c] font-medium"
            >
              <HugeiconsIcon icon={PlusSignIcon} size={17} strokeWidth={2.2} />
              Add Question
            </button>
            <div className="flex flex-col">
              <h1 className="font-medium pt-3 pb-1 px-2">Title</h1>
              <input
                className="h-10 px-3 border placeholder:text-[#a4a4a4] placeholder:text-sm placeholder:font-light border-[#c4ccc8] w-7/10 rounded-md sqc-md hover:border-[#48c58a] focus:outline-none focus:ring-2 focus:ring-[#48c58a]"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Quiz title"
              />
              <h1 className="font-medium pt-3 pb-1 px-2">Description</h1>
              <textarea
                className=" placeholder:text-[#a4a4a4] placeholder:text-sm placeholder:font-light px-3 py-1 border border-[#c4ccc8] sqc-md hover:border-[#48c58a] focus:outline-none focus:ring-2 focus:ring-[#48c58a]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Quiz description"
              ></textarea>
              <div>
                <h1 className="font-medium pt-3 pb-1 px-2">Privacy</h1>
                <div className="w-64 relative" ref={ref}>
                  {/* SELECT BUTTON */}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className=" w-8/10 flex justify-between text-sm items-center px-4 py-2 bg-white border border-[#c4ccc8] sqc-md text-[#a4a4a4] hover:border-[#48c58a] focus:outline-none focus:ring-2 focus:ring-[#48c58a]"
                  >
                    <span className="text-sm">{selected.label}</span>
                    <span
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      <HugeiconsIcon icon={ArrowDownDoubleIcon} size={18} />
                    </span>
                  </button>

                  {/* DROPDOWN OPTIONS */}
                  {isOpen && (
                    <ul
                      className={`absolute mt-2 w-6/10 bg-white border p-3 transform transition-all duration-200 origin-top border-gray-200 sqc-lg shadow-lg overflow-hidden z-10 ${
                        isOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2"
                      }`}
                    >
                      {options.map((option) => (
                        <li
                          key={option.value}
                          onClick={() => {
                            setSelected(option);
                            setIsOpen(false);
                          }}
                          className={` px-4 py-2 cursor-pointer text-sm transition-colors ${
                            selected.value === option.value
                              ? "bg-[#c3ffe2] text-[#24ad6d] sqc-sm"
                              : "text-gray-700 hover:bg-[#eeeeee]"
                          } `}
                        >
                          {option.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
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
