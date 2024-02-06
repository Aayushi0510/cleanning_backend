// routes/orderRoutes.js
import express from "express";
import { createQuestion, getQuestionsByModuleId } from "../controllers/questionController.js";


const router = express.Router();
router.get('/modules/:moduleId/questions', getQuestionsByModuleId);

router.post('/modules/questions', createQuestion);
// router.post("/verify-otp", otpVerfication);


export default router;
