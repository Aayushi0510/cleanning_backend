import  express  from "express";
import { getProgress, updatedStatus, userProgress } from "../controllers/userprogressController.js";

const router=express.Router();

router.post("/user-progress", userProgress)
router.post("/user-progress/update" , updatedStatus)
router.get("/user-progress/:userId/:courseId" ,getProgress)

export default router