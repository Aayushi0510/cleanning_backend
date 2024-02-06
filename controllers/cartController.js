import cart from "../model/cartModel.js";
import course from "../model/courseModel.js";
import user from "../model/userModel.js";

const addToCart = async (req, res) => {
  const { courseId, price, userId } = req.body;

  try {
    const courses = await course.findById(courseId);

    if (!courses) {
      return res.status(404).json({ error: "Course not found" });
    }

    const users = await user.findById(userId);

    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }

    const cartItem = { course: courseId, price };

    const carts = await cart.findOneAndUpdate(
      { user: userId },
      { $push: { items: cartItem } },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "Item added to the shopping cart.", carts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCartByUser = async (req, res) => {
  const { id } = req.params;
  try {
   // const cartItems = await cart.find({ user: id }).populate("course");
   const cartItems = await cart.findOne({ user: id }).populate('items.course');

    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

export { addToCart, getCartByUser };
