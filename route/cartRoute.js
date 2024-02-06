import  express  from "express";
import { addToCart, getCartByUser } from "../controllers/cartController.js";

const router=express.Router();



router.get("/cart/:id", getCartByUser)
router.post("/add-to-cart" , addToCart)


export default router