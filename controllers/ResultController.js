import QuizResult from "../model/resultModel.js";

const submitQuizResult = async (req, res) => {
    try {
        const { userId, moduleId, result } = req.body;
        const existingResult = await QuizResult.findOne({ userId, moduleId });

        if (existingResult) {
            const updatedResult = await QuizResult.findOneAndUpdate(
                { userId, moduleId },
                { result, completed: true },
                { new: true }
            );
            res.json(updatedResult);
        } else {
            const newResult = new QuizResult({
                userId,
                moduleId,
                result,
                completed: true,
            });

            const savedResult = await newResult.save();
            res.json(savedResult);
        }
    } catch (error) {
        console.error('Error submitting quiz result:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getResults=async (req, res) => {
    console.log("sdhfdfsh")
    try {
        const { userId, moduleId } = req.params;
        console.log(userId ,moduleId ,"moduleIdmoduleId")

        // Find the quiz result with the given userId and moduleId
        const result = await QuizResult.findOne({ userId, moduleId });
                
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({ error: 'Quiz result not found' });
        }
    } catch (error) {
        console.error('Error fetching quiz result:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
export { submitQuizResult ,getResults };
