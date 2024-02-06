import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var cartSchmea = new mongoose.Schema({
  items: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
      // Other fields related to the item
    }
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  price: { type: Number, required: true },
});

//Export the model
const cart = mongoose.model("cart", cartSchmea);
export default cart;
