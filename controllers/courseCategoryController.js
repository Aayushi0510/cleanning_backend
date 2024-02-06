import courseCategory from "../model/categoryModel.js";

const createCategory = async (req, res) => {
  const {title}=req.body
    try {
      const newCategory = await courseCategory.create({title});
      res.json(newCategory);
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  };


const getCategory = async (req, res) => {
    try {
      const newCategory = await courseCategory.find();
      res.json(newCategory);
    } catch (error) {
      throw new Error(error);
    }
  };
  

  const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
      const category = await courseCategory.findById(categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Update a category by id
  const updateCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    const { title } = req.body;
    try {
      const updatedCategory = await courseCategory.findByIdAndUpdate(
        categoryId,
        { title },
        { new: true } // Return the modified document
      );
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(updatedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  // Delete a category by id
  const deleteCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
      const deletedCategory = await courseCategory.findByIdAndRemove(categoryId);
      if (!deletedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(deletedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  export { createCategory, getCategory ,deleteCategoryById ,updateCategoryById ,getCategoryById};
