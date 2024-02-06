import  express  from "express";
import authenticateUser from "../middleware/authMiddleware.js";
import { createCategory, deleteCategoryById, getCategory, getCategoryById, updateCategoryById } from "../controllers/courseCategoryController.js";

const router=express.Router();



router.get("/categories", getCategory)
router.post("/category", createCategory)
router.get('/category/:id', getCategoryById);
router.put('/category/:id', updateCategoryById);
router.delete('/category/:id', deleteCategoryById);

export default router