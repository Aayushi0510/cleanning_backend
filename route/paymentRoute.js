// routes/orderRoutes.js
import express from "express";
import { addPayment } from "../controllers/paymentController.js";


const router = express.Router();

router.post("/create-checkout-session", addPayment);
// router.post("/verify-otp", otpVerfication);


export default router;
