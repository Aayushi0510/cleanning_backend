import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  courseId: [{ type: mongoose.Schema.Types.ObjectId, ref: "course" }],
  paymentStatus: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  streetName: {
    type: String,
    required: true,
  },
  streetNo: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  townCity: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
