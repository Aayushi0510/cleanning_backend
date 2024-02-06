import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, required: true },
  result: {
    type: Number,
    required: false,
  },
  completed: { type: Boolean, default: false },
});

const QuizResult = mongoose.model("QuizResult", quizResultSchema);

export default QuizResult;
