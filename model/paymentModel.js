import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  courseId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'course',
    required: true,
  }],
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'], // Add other possible statuses as needed
    default: 'unpaid',
  },
  // Add other relevant fields for a payment
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
