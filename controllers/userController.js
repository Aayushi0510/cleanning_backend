import user from "../model/userModel.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "smtp.hostinger.com",
//   port: 465,

//   auth: {
//     user: "test@byond.team",
//     pass: "Jaguar$#369!",
//   },
// });
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aayushisharma.byond@gmail.com",
    pass: "cuwn dnry zihz telb",
  },
});


const sendRegistrationEmail = (userEmail) => {
  console.log(userEmail);
  const mailOptions = {
    from: "aayushisharma.byond@gmail.com",
    to: userEmail,
    subject: "Registration Successful",
    text: "Thank you for registering with our workplace safety app!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
const getUser = async (req, res) => {
  try {
    const users = await user.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, mobileNo, password } = req.body;
  const checkEmail = await user.findOne({ email: email });
  if (checkEmail) {
    res.send({ msg: "Email aleardy Exist", status: "Failed" });
  } else if (email && password && mobileNo && name) {
    try {
      let hashpassword = await bcrypt.hash(password, 10);
      const data = await user.create({
        name: name,
        email: email,
        mobileNo: mobileNo,
        password: hashpassword,
      });
      sendRegistrationEmail(email);

      console.log(data);
      res.send({ msg: "Sucessfully Registetred", status: "ok", data });
    } catch (error) {
      res.send({ msg: "User is Not Registered" });
    }
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const data = await user.findOne({ email: email });

      if (data && (await bcrypt.compare(password, data.password))) {
        const accessToken = Jwt.sign(
          { _id: data._id },
          process.env.Access_Token,
          { expiresIn: "1d" }
        );

        // Generate Refresh Token
        const refreshToken = Jwt.sign(
          { _id: data._id },
          process.env.refresh_token,
          { expiresIn: "2d" }
        );

        const updateuser = await user.findByIdAndUpdate(data.id, {
          accessToken: accessToken,
          refreshToken: refreshToken,
        });

        // Ensure that the data object reflects the updated user
        data.accessToken = accessToken;
        data.refreshToken = refreshToken;

        res.status(200).json({
          msg: "Successfully logged in",
          data: data,
        });
      } else {
        // User not found or incorrect password
        res.status(401).json({
          msg: "Invalid credentials",
          status: "failed",
        });
      }
    } else {
      // Missing email or password in request
      res.status(400).json({
        msg: "Email and password are required",
        status: "failed",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      msg: "Error occurred during login",
      status: "failed",
    });
  }
};

const logOut = async (req, res) => {
  try {
    const token = req.headers.authorization.trim();

    if (!token) {
      return res
        .status(400)
        .json({ msg: "No access token provided", status: "failed" });
    }

    console.log("Token:", token);

    const userRecord = await user.findOne({ accessToken: token });

    console.log("User Record:", userRecord);

    if (!userRecord) {
      return res.status(404).json({ msg: "User not found", status: "failed" });
    }

    // Set the accessToken to null for the matched user
    await user.findOneAndUpdate(
      { _id: userRecord._id, accessToken: token },
      { accessToken: "" }
    );

    return res.status(200).json({ msg: "Logout successful", status: "ok" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ msg: "Error occurred while logging out", status: "failed" });
  }
};

const updateUserPassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
      return res.send({
        msg: "userId, currentPassword, and newPassword are required",
        status: "failed",
      });
    }

    const userData = await user.findById(userId);

    if (!userData) {
      return res.send({
        msg: "User not found",
        status: "failed",
      });
    }

    const passwordMatch = await bcrypt.compare(
      currentPassword,
      userData.password
    );

    if (!passwordMatch) {
      return res.send({
        msg: "Current password is incorrect",
        status: "failed",
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const updatedUserData = await user.findByIdAndUpdate(userId, {
      password: hashedNewPassword,
    });

    res.send({
      msg: "Password updated successfully",
      status: "success",
    });
  } catch (error) {
    res.send(error);
  }
};

const editUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email, mobileNo, password } = req.body;

  try {
    console.log("Received userId:", userId);

    const updatedClient = await user.findByIdAndUpdate(
      userId,
      { name, email, mobileNo, password },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "User updated successfully", data: updatedClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating the User" });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const courseDetail = await user.findById(userId);
    if (courseDetail) {
      res
        .status(200)
        .json({ message: "Course retrieved successfully", data: courseDetail });
    } else {
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving the Course" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedClient = await user.findByIdAndRemove(userId);

    if (deletedClient) {
      res
        .status(200)
        .json({ message: "users deleted successfully", data: deletedClient });
    } else {
      res.status(404).json({ message: "users not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting the users" });
  }
};

const contactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: "aayushisharma.byond@gmail.com",
      to: email,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
};

export {
  registerUser,
  loginUser,
  logOut,
  updateUserPassword,
  getUser,
  editUser,
  getUserById,
  deleteUser,
  contactForm,
};
