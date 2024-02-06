import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var category = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,

    },
 
});

//Export the model
const courseCategory=mongoose.model("courseCategory",category);
export default courseCategory