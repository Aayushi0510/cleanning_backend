import course from "../model/courseModel.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import streamifier from "streamifier"; // Import the streamifier module

const getCourse = async (req, res) => {
  try {
    const courses = await course.find();
    res.json({ data: courses });
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

// const addCourse = async (req, res) => {
//   try {
//     const { title, categoryId, description, rating, totalUsers, price  } = req.body;
//     const vedieo = req.file;
//     console.log(vedieo,"vedieo")
//     const timestamp = Math.round(new Date().getTime() / 1000);
//     const signature = cloudinary.utils.api_sign_request(
//       { timestamp: timestamp, folder: 'uploads' },
//      '0z8R_vJSPNUs3KRW7E6fA7Gz0_A',

//       { algorithm: 'sha256', folder: 'uploads' }

//     );

//     // Upload video to Cloudinary
//     const result = await cloudinary.uploader.upload(vedieo.path, {
//       resource_type: 'video',
//       folder: 'uploads',
//       timestamp: timestamp,
//       signature: signature,
//       api_key: '541891155199954',
//     });
// console.log(result)
//     // Upload video to Cloudinary

//     const courseData = {
//       title,
//       categoryId,
//       description,
//       rating,
//       totalUsers,
//       price,
//       vedieo: {
//         path: result.secure_url,
//         publicId: result.public_id,
//       },
//     };

//     // Save course data to your database
//     const createdCourse = await course.create(courseData);

//     res.json({ message: 'Course created successfully', createdCourse });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server errorsss' });
//   }
// };

// const addCourse = async (req, res) => {
//   try {
//     const {
//       title,
//       categoryId,
//       description,
//       rating,
//       totalUsers,
//       price,
//       modules,
//     } = req.body;

//     const courses = new course({
//       title,
//       categoryId,
//       description,
//       rating,
//       totalUsers,
//       price,
//       modules,
//     });

//     // Iterate through modules and parts, upload videos to Cloudinary
//     for (const module of courses.modules) {
//       for (const part of module.parts) {
//         const fileKey = `modules[0][parts][0][video]`;
//         const file = req.files[fileKey];
// console.log(file)
//         if (!file) {
//           return res.status(400).json({ error: 'Video file is required' });
//         }

//         // Upload video to Cloudinary using stream
//         const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'video', folder: 'uploads' },
//           (error, result) => {
//             if (error) {
//               console.error('Error uploading video:', error);
//               res.status(500).json({ error: 'Error uploading video to Cloudinary' });
//             } else {
//               console.log('Video uploaded successfully:', result);
//               part.vedieo = result.secure_url;
//             }
//           });

//         // Pipe the buffer stream to the Cloudinary upload stream
//         const bufferStream = streamifier.createReadStream(file[0].buffer);
//         bufferStream.pipe(uploadStream);

//         // Save the course to the database
//         await courses.save();

//         res.status(201).json({ message: 'Course created successfully', courses});
//       }
//     }
//   } catch (error) {
//     console.error('Error creating course:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// const addCourse = async (req, res) => {
//   try {
//     const {
//       title,
//       categoryId,
//       description,
//       facultyName,
//       rating,
//       totalUsers,
//       price,
//       modules,
//     } = req.body;

//     const courses = new course({
//       title,
//       categoryId,
//       description,
//       rating,
//       facultyName,
//       totalUsers,
//       price,
//       modules,
//     });

//     const uploadPromises = [];

//     // Iterate through modules and parts, create promises for video uploads
//     for (const [moduleIndex, module] of courses.modules.entries()) {
//       for (const [partIndex, part] of module.parts.entries()) {
//         const fileKey = `modules[${moduleIndex}][parts][${partIndex}][video]`;
//         const file = req.files[fileKey];
//         console.log(file[0].path);

//         if (!file) {
//           return res.status(400).json({ error: "Video file is required" });
//         }

//         uploadPromises.push(uploadPromise);
//       }
//     }
//     await Promise.all(uploadPromises);
//     await courses.save();

//     res.status(201).json({ message: "Course created successfully", courses });
//   } catch (error) {
//     console.error("Error creating course:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const addCourse = async (req, res) => {
//   try {
//     const {
//       title,
//       categoryId,
//       description,
//       facultyName,
//       rating,
//       totalUsers,
//       price,
//       modules,
//     } = req.body;

//     const updatedModules = modules.map((module, moduleIndex) => {
//       if (!module || !Array.isArray(module.parts)) {
//         return res.status(400).json({ error: "Invalid module or parts structure" });
//       }

//       const updatedParts = module.parts.map((part, partIndex) => {
//         if (!part) {
//           return res.status(400).json({ error: "Invalid part structure" });
//         }

//         const fileKey = `modules[${moduleIndex}][parts][${partIndex}][video]`;
//         const file = req.files[fileKey] && req.files[fileKey][0];
//         if (!file) {
//           return res.status(400).json({ error: "Video file is required" });
//         }

//         const filePath = file.path;
//         console.log('Before assignment:', part.video);
//         part.video = filePath;
//         console.log('After assignment:', part.video);

//         return part;
//       });

//       return { ...module, parts: updatedParts };
//     });

//     // Update req.body.modules with the modified data
//     req.body.modules = updatedModules;

//     const courses = new course({
//       title,
//       categoryId,
//       description,
//       rating,
//       facultyName,
//       totalUsers,
//       price,
//       modules: updatedModules, // Use the updated modules here
//     });

//     // Save the courses document after updating video paths
//     await courses.save();

//     // Send a success response
//     res.status(201).json({ message: "Course created successfully", courses });
//   } catch (error) {
//     console.error("Error creating course:", error);
//     res.status(500).json({ error: "Internal server errorss" });
//   }
// };


const baseVideoUrl = "http://localhost:8000/";

const addCourse = async (req, res) => {
  try {
    const {
      title,
      categoryId,
      description,
      subTitle,
      rating,
      overview,
      price,
      modules,
    } = req.body;

    console.log(req.body)

    const updatedModules = modules.map((module, moduleIndex) => {
      if (!module || !Array.isArray(module.parts)) {
        return res
          .status(400)
          .json({ error: "Invalid module or parts structure" });
      }
      const updatedParts = module.parts.map((part, partIndex) => {
        if (!part) {
          return res.status(400).json({ error: "Invalid part structure" });
        }

        console.log(req.files);
        const videoKey = `modules[${moduleIndex}][parts][${partIndex}][video]`;
        const videoFileName = req.files[videoKey][0].filename;
        if (!videoFileName) {
          return res.status(400).json({ error: "Video file is required" });
        }

        const videoUrl = baseVideoUrl + "uploads/" + videoFileName;
        console.log("Before assignment:", part.video);
        part.video = videoUrl;
        console.log("After assignment:", part.video);

        return part;
      });

      return { ...module, parts: updatedParts };
    });

    req.body.modules = updatedModules;

    const courses = new course({
      title,
      categoryId,
      description,
      subTitle,
      rating,
      overview,
      price,
      modules: updatedModules,
    });

    await courses.save();

    // Send a success response
    res.status(201).json({ message: "Course created successfully", courses });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    const courseDetail = await course.findById(courseId);
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

const getCoursesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const courses = await course.find({ categoryId });
    const formattedCourses = courses.map((course) => ({
      title: course.title,
      description: course.description,
      discount: course.discount,
      rating: course.rating,
      quantity: course.quantity,
      price: course.price,
    }));

    res.status(200).json({ categoryId, courses: formattedCourses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving courses" });
  }
};

// const editCourse = async (req, res) => {
//   const { courseId } = req.params;
//   const {
//     title,
//     categoryId,
//     subTitle,
//     description,
//     facultyName,
//     rating,
//     totalUsers,
//     price,
//     modules,
//   } = req.body;
//   try {
//     console.log("Received userId:", courseId);

//     const updateCourse = await course.findByIdAndUpdate(
//       courseId,
//       {
//         title,
//         categoryId,
//         subTitle,
//         description,
//         facultyName,
//         rating,
//         totalUsers,
//         price,
//         modules,
//       },
//       { new: true }
//     );i

//     res
//       .status(200)
//       .json({ message: "Course updated successfully", data: updateCourse });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error updating the Course" });
//   }
// };

const editCourse = async (req, res) => {
  const { courseId } = req.params;
  console.log(courseId)
  try {
    const {
      title,
      categoryId,
      description,
      subTitle,
      overview,
      rating,
      totalUsers,
      price,
      modules,
    } = req.body;

    if (!courseId) {
      return res
        .status(400)
        .json({ error: "Course ID is required for editing" });
    }

    const updatedModules = modules.map((module, moduleIndex) => {
      if (!module || !Array.isArray(module.parts)) {
        return res
          .status(400)
          .json({ error: "Invalid module or parts structure" });
      }
      console.log(req.files);
      const updatedParts = module.parts.map((part, partIndex) => {
        if (!part) {
          return res.status(400).json({ error: "Invalid part structure" });
        }

        const videoKey = `modules[${moduleIndex}][parts][${partIndex}][video]`;
        if (videoKey in req.files && req.files[videoKey].length > 0) {
          const videoFileName = req.files[videoKey][0].filename;

          if (!videoFileName) {
            return res.status(400).json({ error: "Video file is required" });
          }
          console.log(videoKey);
          const videoUrl = baseVideoUrl + "uploads/" + videoFileName;
          console.log("Before assignment:", part.video);
          part.video = videoUrl;
          console.log("After assignment:", part.video);
        }

        return part;
      });

      return { ...module, parts: updatedParts };
    });

    // Update req.body.modules with the modified data
    req.body.modules = updatedModules;

    // Find the course by ID and update its fields
    const updatedCourse = await course.findByIdAndUpdate(
      courseId,
      {
        title,
        categoryId,
        description,
        subTitle,
        rating,
        overview,
        totalUsers,
        price,
        modules: updatedModules,
      },
      { new: true } // Return the modified document after update
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Send a success response
    res
      .status(200)
      .json({ message: "Course updated successfully", updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  console.log(courseId);
  try {
    const deletedCourse = await course.findByIdAndRemove(courseId);

    if (deletedCourse) {
      res
        .status(200)
        .json({ message: "Course deleted successfully", data: deletedCourse });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting the Course" });
  }
};

const getModulesCOurseDeatil = async (req, res) => {
  const { courseId, moduleId } = req.params;

  try {
    const result = await course.findOne(
      { _id: courseId, "modules._id": moduleId },
      {
        "modules.$": 1,
      }
    );

    if (!result) {
      return res.status(404).json({ error: "Course or module not found" });
    }

    const moduleDetails = result.modules[0];

    if (moduleDetails && moduleDetails.parts) {
      return res.json({ moduleDetails });
    } else {
      return res.json({ error: "No parts found in the module" });
    }
  } catch (error) {
    console.error("Error fetching module details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getModuleOFcourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    // Find the course by ID
    const courses = await course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Access the associated modules information
    const modules = courses.modules;
    const simplifiedModules = modules.map(({ name, _id }) => ({ name, _id }));

    res.json(simplifiedModules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export {
  addCourse,
  getCourse,
  getCoursesByCategory,
  getCourseById,
  editCourse,
  deleteCourse,
  getModulesCOurseDeatil,
  getModuleOFcourse,
};
