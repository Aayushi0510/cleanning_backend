import mongoose from "mongoose";

const partProgressSchema = new mongoose.Schema({
  partNumber: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: true,
  },
});

const moduleProgressSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course.modules",
    required: true,
  },
  partsCompleted: [partProgressSchema],
});

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  moduleProgress: [moduleProgressSchema],
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);

export default UserProgress;
