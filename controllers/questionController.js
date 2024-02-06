import Question from "../model/questionModel.js";

const createQuestion = async (req, res) => {
  const { questionText, options, correctOption ,moduleId} = req.body;
  try {
     
    const question = new Question({
      moduleId,
      questionText,
      options,
      correctOption,
    });
    await question.save();
    res.json({ message: "Question created successfully", question });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create question" });
  }
};


const getQuestionsByModuleId = async (req, res) => {
    const { moduleId } = req.params;
    try {
      const questions = await Question.find({ moduleId });
      res.json({ questions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve questions' });
    }
  }

export { createQuestion ,getQuestionsByModuleId};
