import Quiz from "../schemas/quiz.schema.js";

export const createQuiz = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, questions } = req.body;
    if (
      !title ||
      !description ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "title, description and questions are required" });
    }

    const sanitizedQuestions = questions.map((q, index) => {
      if (
        !q.questionText ||
        !Array.isArray(q.options) ||
        q.options.length < 2 ||
        !q.correctAnswer
      ) {
        throw new Error(
          "Each question requires questionText, at least 2 options and correctAnswer",
        );
      }
      return {
        questionId: q.questionId || `q${index + 1}`,
        questionText: q.questionText,
        points: q.points || 1,
        options: q.options,
        correctAnswer: q.correctAnswer,
      };
    });

    const createdQuiz = await Quiz.create({
      title,
      description,
      createdBy: userId,
      questions: sanitizedQuestions,
    });
    return res.status(201).json({ message: "Quiz created", data: createdQuiz });
  } catch (error) {
    next(error);
  }
};

export const getQuizById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findById(id).populate(
      "createdBy",
      "firstName lastName username",
    );
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    // Do not expose correct answers for takers
    const safeQuestions = quiz.questions.map((q) => ({
      questionId: q.questionId,
      questionText: q.questionText,
      points: q.points,
      options: q.options,
    }));
    return res.json({ data: { ...quiz.toObject(), questions: safeQuestions } });
  } catch (error) {
    next(error);
  }
};

export const submitQuiz = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;
    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ message: "Answers object is required" });
    }
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let correct = 0;
    const detail = quiz.questions.map((q) => {
      const selected = answers[q.questionId];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correct += 1;
      return {
        questionId: q.questionId,
        selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    return res.json({
      data: { total: quiz.questions.length, correct, detail },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyQuizzes = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const quizzes = await Quiz.find({ createdBy: userId }).sort({
      createdAt: -1,
    });
    return res.json({ data: quizzes });
  } catch (error) {
    next(error);
  }
};
