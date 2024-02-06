import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOption: { type: String, required: true },
  // Add other question properties as needed
});

const Question = mongoose.model('Question', questionSchema);


export default Question