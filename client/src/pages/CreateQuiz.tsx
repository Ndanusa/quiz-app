import { useState } from "react";
import { BACKEND_URI } from "../config/config.ts";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      q1: {
        question: "",
        options: [
          {
            optionId: "A",
            text: "",
          },
          {
            optionId: "B",
            text: "",
          },
          {
            optionId: "C",
            text: "",
          },
          {
            optionId: "D",
            text: "",
          },
        ],
        correctAnswer: "a",
      },
    },
  ]);
  return (
    <div className="flex">
      <p>title</p>
      <input
        placeholder="title"
        className="border"
        type="text"
        value={title}
        onChange={(e) => {
          const value = e.target.value;
          setTitle(value);
        }}
      />
    </div>
  );
}
export default CreateQuiz;
