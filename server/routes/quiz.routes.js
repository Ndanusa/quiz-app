import { Router } from "express";
import { verifyUser } from "../controllers/auth.controller.js";
import {
  createQuiz,
  getQuizById,
  submitQuiz,
  getMyQuizzes,
} from "../controllers/quiz.controller.js";

const router = Router();

router.post("/", verifyUser, createQuiz);
router.get("/:id", verifyUser, getQuizById);
router.post("/:id/submit", verifyUser, submitQuiz);
router.get("/user/me", verifyUser, getMyQuizzes);

export default router;
