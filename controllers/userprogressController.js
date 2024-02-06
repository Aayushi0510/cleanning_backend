import UserProgress from "../model/UserProgressSchema.js";
import course from "../model/courseModel.js";
import user from "../model/userModel.js";
import  mongoose from 'mongoose';


const userProgress=async (req, res) => {
    try {
      const { userId, courseId } = req.body;
  console.log(userId ,courseId)
      // Check if the user and course exist
      const users = await user.findById(userId);
      const courses = await course.findById(courseId);
  
      if (!users || !courses) {
        return res.status(404).json({ error: 'User or Course not found' });
      }
  
      // Create a new UserProgress document
      const userProgress = new UserProgress({
        userId,
        courseId,
        moduleProgress: [],
      });
  
      // Save the UserProgress document
      await userProgress.save();
  
      res.status(201).json(userProgress);
    } catch (error) {
      console.error('Error creating user progress:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }   
  };

  const updatedStatus = async (req, res) => {
    try {
      const { userId, courseId, moduleId, partNumber } = req.body;
  
      // Find the user progress document
      let userProgress = await UserProgress.findOne({ userId, courseId });
      const coursess = await course.findById(courseId);
  
      if (!userProgress) {
        return res.status(404).json({ error: 'User progress not found' });
      }
  
      // Find or create module progress for the specified module
      const moduleIndex = userProgress.moduleProgress.findIndex(
        (moduleProg) => moduleProg.moduleId.toString() === moduleId.toString()
      );
  
      if (moduleIndex === -1) {
        // User is starting this module
        const uniquePartId = new mongoose.Types.ObjectId();
        userProgress.moduleProgress.push({
          moduleId,
          partsCompleted: [
            {
              _id: uniquePartId,
              partNumber,
            },
          ],
          completed: false, // Initialize completed status to false
        });
      } else {
        // User has already started this module
        const existingPartIndex = userProgress.moduleProgress[moduleIndex].partsCompleted.findIndex(
          (part) => part.partNumber === partNumber
        );
  
        if (existingPartIndex === -1) {
          // Part doesn't exist, create a new part
          const uniquePartId = new mongoose.Types.ObjectId();
          userProgress.moduleProgress[moduleIndex].partsCompleted.push({
            _id: uniquePartId,
            partNumber,
          });
        }
  
        // Check if all parts within the module are completed
        const moduleParts = userProgress.moduleProgress[moduleIndex].partsCompleted;
        const module = coursess.modules.find((module) => module._id.toString() === moduleId.toString());
  
        if (!module) {
          return res.status(404).json({ error: 'Module not found' });
        }
  
        const allModulePartsCompleted = module.parts.every((part) =>
          moduleParts.some((completedPart) => completedPart.partNumber === part.partNumber)
        );
  
        // Update the completed status for the module
        userProgress.moduleProgress[moduleIndex].completed = allModulePartsCompleted;
        console.log(userProgress.moduleProgress[moduleIndex].completed)

        console.log("allModulePartsCompleted", allModulePartsCompleted);
        console.log(
          "!userProgress.moduleProgress[moduleIndex].completed",
          !userProgress.moduleProgress[moduleIndex].completed
        );
  
        if (allModulePartsCompleted && !userProgress.moduleProgress[moduleIndex].completed) {
          // Set the module as completed only if it was not already completed
        
          console.log("Setting completed to true");
          await UserProgress.findByIdAndUpdate(
            userProgress._id,
            {
              $set: { [`moduleProgress.${moduleIndex}.completed`]: true },
            },
            { new: true }
          );
        }
      }
  
      await userProgress.save();
  
      res.json(userProgress);
    } catch (error) {
      console.error('Error updating user progress:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  ;
  
  const getProgress=async (req, res) => {
    try {
      const { userId, courseId } = req.params;
        const userProgress = await UserProgress.findOne({ userId, courseId });
  
      if (!userProgress) {
        return res.status(404).json({ error: 'User progress not found' });
      }
  
      // Return the user progress data
      res.json(userProgress);
    } catch (error) {
      console.error('Error fetching user progress:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
  
  
  

  export {userProgress ,updatedStatus ,getProgress}