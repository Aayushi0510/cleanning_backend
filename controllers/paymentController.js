import Payment from "../model/paymentModel.js";
import Order from "../model/orderModel.js"; // Fix the import statement
import courses from "../model/courseModel.js";
import stripePackage from "stripe";
import nodemailer from "nodemailer";
import user from "../model/userModel.js";
import UserProgress from "../model/UserProgressSchema.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aayushisharma.byond@gmail.com",
    pass: "cuwn dnry zihz telb",
  },
});

const sendOrderConfirmationEmail = (userEmail) => {
  console.log(userEmail);
  const mailOptions = {
    from: "aayushisharma.byond@gmail.com",
    to: userEmail,
    subject: "Order Confirmation",
    text: "Your order has been successfully placed. Thank you!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
const stripe = stripePackage(
  "sk_test_51OSkjcSJg3MN1lkAW4QKwZ3evgxbB5XvZSBhbTLXfOAvRUqOP801lnKFDUQrUkYDqXXyRHJ0MmRkm8rdXE2wZTGT004OSFBJtd"
);

// const addPayment = async (req, res) => {
//   const { userId, course } = req.body;
//   console.log(course)
//   const lineItems = course.map((ele) => ({
//     price_data: {
//       currency: "usd", // Set the currency to USD
//       product_data: {
//         name: ele?.title,
//       },
//       unit_amount: ele?.price * 100, // Assuming amount is in dollars
//     },
//     quantity: 1,
//   }));

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `https://api-work-place-safety.onrender.com/success`,
//       cancel_url: `https://api-work-place-safety.onrender.com/cancel`,
//     });

//     // Assuming session.payment_status will be "paid" after successful payment
//     const paymentStatus = session.payment_status;

//     const orders = new Order({
//       userId: userId,
//       courseId: course.map((ele) => ele._id),
//       paymentStatus: paymentStatus,
//     });
//     console.log(orders)

//     await orders.save();

//     const payments = new Payment({
//       userId: userId,
//       courseId: course.map((ele) => ele._id),
//       paymentStatus: paymentStatus,
//     });
//     console.log(payments)

//     await payments.save();

//     res.status(200).json({ sessionId: session.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to create Checkout Session" });
//   }
// };
const addPayment = async (req, res) => {
  const {
    userId,
    courseId,
    course,
    name,
    mobileNo,
    companyName,
    streetName,
    streetNo,
    postalCode,
    townCity,
    province,
    country,
  } = req.body;
  console.log(name, "name");
  try {
    // Check if there are any courses with a price greater than 0
    const coursesToCheckout = course.filter((ele) => ele?.price > 0);

    // Check if there are any courses with a price equal to 0
    const coursesWithoutCheckout = course.filter((ele) => ele?.price === 0);

    // Create a checkout session only if there are courses with a price greater than 0
    if (coursesToCheckout.length > 0) {
      const lineItems = coursesToCheckout.map((ele) => ({
        price_data: {
          currency: "usd", // Set the currency to USD
          product_data: {
            name: ele?.title,
          },
          unit_amount: ele?.price * 100, // Assuming amount is in dollars
        },
        quantity: 1,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `https://api-work-place-safety.onrender.com/success`,
        cancel_url: `https://api-work-place-safety.onrender.com/cancel`,
      });

      // Assuming session.payment_status will be "paid" after successful payment
      const paymentStatus = session.payment_status;

      // Update payment and order status for courses with a price greater than 0
      const orders = new Order({
        userId: userId,
        courseId: coursesToCheckout.map((ele) => ele._id),
        paymentStatus: paymentStatus,
        name: name,
        mobileNo: mobileNo,
        companyName: companyName,
        streetName: streetName,
        streetNo: streetNo,
        postalCode: postalCode,
        townCity: townCity,
        province: province,
        country: country,
      });

      await orders.save();
      console.log(orders);

      const userss = await user.findById(userId);
      const coursess = await courses.findById(courseId);

      if (!userss || !coursess) {
        return res.status(404).json({ error: "User or Course not found" });
      }

      // Create a new UserProgress document
      let userProgress = await UserProgress.findOne({ userId, courseId });

      if (!userProgress) {
        // If the user progress document doesn't exist, initialize it
        const modules = coursess.modules; // Assuming 'modules' is an array in your course schema

        const initialModuleProgress = modules.map((module) => ({
          moduleId: module._id, // Assuming your modules have unique IDs
          partsCompleted: [], // Initialize as an empty array
          completed: false,
        }));

        // Create a new UserProgress document
        userProgress = new UserProgress({
          userId,
          courseId,
          moduleProgress: initialModuleProgress,
        });

        // Save the UserProgress document
        await userProgress.save();
      }

      const payments = new Payment({
        userId: userId,
        courseId: coursesToCheckout.map((ele) => ele._id),
        paymentStatus: paymentStatus,
      });
      const users = await user.findById(userId);
      if (users) {
        await sendOrderConfirmationEmail(users.email);
      }
      res.status(200).json({ sessionId: session.id });
    }

    if (coursesWithoutCheckout.length > 0) {
      // Update order and payment status directly for courses with a price of 0
      const paymentStatusZero = "unpaid";

      const ordersWithoutCheckout = new Order({
        userId: userId,
        courseId: coursesWithoutCheckout.map((ele) => ele._id),
        paymentStatus: paymentStatusZero,
        name: name,
        mobileNo: mobileNo,
        companyName: companyName,
        streetName: streetName,
        streetNo: streetNo,
        postalCode: postalCode,
        townCity: townCity,
        province: province,
        country: country,
      });
      console.log(ordersWithoutCheckout);

      await ordersWithoutCheckout.save();
      const userss = await user.findById(userId);
      const coursess = await courses.findById(courseId);

      if (!userss || !coursess) {
        return res.status(404).json({ error: "User or Course not found" });
      }

      // Create a new UserProgress document
      let userProgress = await UserProgress.findOne({ userId, courseId });

      if (!userProgress) {
        // If the user progress document doesn't exist, initialize it
        const modules = coursess.modules; // Assuming 'modules' is an array in your course schema
console.log(modules)
        const initialModuleProgress = modules.map((module) => ({
          moduleId: module._id, // Assuming your modules have unique IDs
          partsCompleted: [], // Initializ
          completed: false,
        }));

        // Create a new UserProgress document
        userProgress = new UserProgress({
          userId,
          courseId,
          moduleProgress: initialModuleProgress,
        });

        // Save the UserProgress document
        await userProgress.save();
      }

      const paymentsWithoutCheckout = new Payment({
        userId: userId,
        courseId: coursesWithoutCheckout.map((ele) => ele._id),
        paymentStatus: paymentStatusZero,
      });
      console.log(paymentsWithoutCheckout);

      const users = await user.findById(userId);
      if (users) {
        await sendOrderConfirmationEmail(users.email);
      }
      res
        .status(200)
        .json({ message: "Orders and payments updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update orders and payments" });
  }
};

export { addPayment };
