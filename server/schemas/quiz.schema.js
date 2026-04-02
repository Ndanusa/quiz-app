import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 150,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 400,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz-User",
      required: true,
    },
    questions: [
      {
        questionId: { type: String, required: true },
        question: { type: String, required: true },
        points: { type: Number, required: true, default: 1 },
        options: [
          {
            optionId: { type: String, required: true },
            text: { type: String, required: true },
          },
        ],
        correctAnswer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
