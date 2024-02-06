import  express  from "express";
import {contactForm, deleteUser, editUser, getUser, getUserById, logOut, loginUser, registerUser, updateUserPassword} from "../controllers/userController.js"
import authenticateUser from "../middleware/authMiddleware.js";
const router=express.Router();

router.get("/users" ,getUser)
router.get("/user/:userId" ,getUserById)

router.post("/register" ,registerUser)
router.post("/login",loginUser)
router.get("/logout" ,logOut)
router.post("/update-password" ,updateUserPassword)
router.put("/user/:userId", editUser); 
router.delete("/user/:userId",  deleteUser)
router.post("/send-email",  contactForm)


export default router