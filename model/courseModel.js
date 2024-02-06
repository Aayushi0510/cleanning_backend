import mongoose from "mongoose";

const partSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true,
  },
  partNumber: {
    type: String,
    required: true,
  },
});

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  parts: [partSchema],
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subTitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  overview: {
    type: String,
    required: true,
    trim: true,
  },

  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Adjust the reference to your actual category model
    required: true,
  },
  // vedieo:{
  // path: String,
  //  publicId: String,
  // }
  modules: [moduleSchema],
});

const course = mongoose.model("course", courseSchema);
export default course;
