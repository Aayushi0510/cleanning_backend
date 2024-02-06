import express from "express";
import { getResults, submitQuizResult } from "../controllers/ResultController.js";


const router = express.Router();

router.post('/submit-quiz-result', submitQuizResult);
router.get('/results/:userId/:moduleId' ,getResults)
export default router;
