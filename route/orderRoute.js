// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  getOrdersByUserId,
  deleteOrder,
  editOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/order", createOrder);
router.get("/orders", getOrders);
router.get("/order/:orderId", getOrderById);
router.put("/order/:orderId", editOrder);
router.delete("/order/:orderId", deleteOrder);


router.get("/orders/:userId", getOrdersByUserId);

export default router;
