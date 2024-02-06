// videoUploadMiddleware.js
import multer from 'multer';
import path from "path";
// Multer setup
const storageEngine = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({
    storage: storageEngine,
    limits: { fileSize: Infinity },
   
});



// const fileFilter = (req, file, cb) => {
//     // Check if the file type is allowed
//     if (file.mimetype.startsWith("vedieo/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("Invalid file type. Only videos are allowed."), false);
//     }
//   };
  

  const videoUploadMiddleware = (req, res, next) => {
    upload.single("vedieo")(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // Multer error occurred
        return res.status(400).json({ error: 'Multer error', details: error.message });
      } else if (error) {
        // Other error occurred
        console.log(error)
        return res.status(500).json({ error: 'Internal server errors' });
      }
  
      // Video uploaded successfully
      next();
    });
  };

  const multiFileUploadMiddleware = (req, res, next) => {
    const fields = [];
  
    // Add the dynamic field names based on your form data structure
    for (let i = 0; i < 10; i++) {
      fields.push({ name: `modules[0][parts][${i}][video]`, maxCount: 1 });
    }
  
    upload.fields(fields)(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // Multer error occurred
        console.error('Multer error:', error.message);
        return res.status(400).json({ error: 'Multer error', details: error.message });
      } else if (error) {
        // Other error occurred
        console.error('Other error:', error);
        return res.status(500).json({ error: 'Internal server errors' });
      }
  
      // Files uploaded successfully
      next();
    });
  };
  
  

export {multiFileUploadMiddleware ,videoUploadMiddleware} ;
