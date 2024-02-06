// controllers/orderController.js
import course from "../model/courseModel.js";
import Order from "../model/orderModel.js";

const createOrder = async (req, res) => {
  try {
    const { courseIds, userId, paymentMethod } = req.body;
    const newOrder = await Order.create({
      courseIds,

      userId,
      paymentMethod,
    });

    res
      .status(201)
      .json({ message: "Order created successfully", data: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating the order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("courseId");

    res.status(200).json({ data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;
console.log(orderId)
  try {
    const orderDetail = await Order.findById(orderId).populate("courseId");
    // Find free courses
    if (orderDetail) {
      res.status(200).json({
        message: "Order retrieved successfully",
        data: orderDetail,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving the order" });
  }
};
const getOrdersByUserId = async (req, res) => {
  const { userId } = req.params;
console.log(userId)
  try {
    const orders = await Order.find({ userId: userId }).populate('courseId');
    console.log(orders);

    if (orders && orders.length > 0) {
      res.status(200).json({
        message: "Orders retrieved successfully",
        data: orders,
      });
    } else {
      res.status(404).json({ message: "Orders not found for the specified userId" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving the orders", details: error.message });
  }
};

const editOrder = async (req, res) => {
  const { orderId } = req.params;
  const { courseIds, userId, paymentMethod } = req.body;
console.log(courseIds ,"courseIds")
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { courseIds, userId, paymentMethod },
      { new: true } // Returns the modified document rather than the original
    );
    if (updatedOrder) {
      res.status(200).json({
        message: "Order updated successfully",
        data: updatedOrder,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating the order" });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (deletedOrder) {
      res.status(200).json({
        message: "Order deleted successfully",
        data: deletedOrder,
      });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting the order" });
  }
};


export { createOrder, getOrders, getOrderById, getOrdersByUserId ,editOrder ,deleteOrder};
