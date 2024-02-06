import  express  from "express";
import { addCourse, deleteCourse, editCourse, getCourse, getCourseById, getCoursesByCategory, getModuleOFcourse, getModulesCOurseDeatil} from "../controllers/courseController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import  { multiFileUploadMiddleware  ,videoUploadMiddleware} from "../middleware/multer.js";
import multer from 'multer';
import fs from 'fs';

const router=express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';

    // Create the 'uploads' directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename (you can use your own logic for this)
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: Infinity },
// }).fields([
//   { name: 'modules[0][parts][0][video]', maxCount: 1 },
//   { name: 'modules[0][parts][1][video]', maxCount: 1 },
//   { name: 'modules[1][parts][0][video]', maxCount: 1 },
//   { name: 'modules[1][parts][1][video]', maxCount: 1 },
//   { name: 'modules[2][parts][0][video]', maxCount: 1 },
//   { name: 'modules[2][parts][1][video]', maxCount: 1 },
//   { name: 'modules[3][parts][0][video]', maxCount: 1 },
//   { name: 'modules[3][parts][1][video]', maxCount: 1 },
//   { name: 'modules[4][parts][0][video]', maxCount: 1 },
//   { name: 'modules[4][parts][1][video]', maxCount: 1 },
//   { name: 'modules[5][parts][0][video]', maxCount: 1 },
//   { name: 'modules[5][parts][1][video]', maxCount: 1 },
//   { name: 'modules[6][parts][0][video]', maxCount: 1 },
//   { name: 'modules[6][parts][1][video]', maxCount: 1 },
//   { name: 'modules[7][parts][0][video]', maxCount: 1 },
//   { name: 'modules[7][parts][1][video]', maxCount: 1 },
//   { name: 'modules[8][parts][0][video]', maxCount: 1 },
//   { name: 'modules[8][parts][1][video]', maxCount: 1 },
//   { name: 'modules[9][parts][0][video]', maxCount: 1 },
//   { name: 'modules[9][parts][1][video]', maxCount: 1 },
//   { name: 'modules[10][parts][0][video]', maxCount: 1 },
//   { name: 'modules[10][parts][1][video]', maxCount: 1 },




//   // Add other fields as needed
// ]);

const moduleCount = 10; // Adjust this based on the actual number of modules
const partCount = 10; // Adjust this based on the actual number of parts per module

const multerFields = [];

for (let i = 0; i < moduleCount; i++) {
  for (let j = 0; j < partCount; j++) {
    const fieldName = `modules[${i}][parts][${j}][video]`;
    multerFields.push({ name: fieldName, maxCount: 1 });
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: Infinity },
}).fields(multerFields);


router.get("/courses" , getCourse)
// router.post("/course" ,videoUploadMiddleware,addCourse)
//  router.post("/course" ,multiFileUploadMiddleware,addCourse)

router.post('/course', upload, (req, res) => {

  addCourse(req, res);
});

router.get("/course/:courseId" ,getCourseById)

router.get("/getByCategory/:categoryId" , getCoursesByCategory)
router.put("/course/:courseId",upload,  (req, res) => {

  editCourse(req, res);
}); 
router.delete("/course/:courseId",  deleteCourse)
router.get("/course/:courseId/module/:moduleId" ,getModulesCOurseDeatil)
router.get("/:courseId/modules" ,getModuleOFcourse)



export default router