const Category = require('../models/Category');


// create tag handler
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "Category name and description is required",
            })
        }
        
        // in mongoose memory not in db yet
        const category = new Category({
            name,
            description
        })
        // save to db , if we do not want to use as two steps , then we can use , .create() directly 
        const savedCategory = await category.save();

        return res.status(201).json({
            success: true,
            message: "category created successfully",
            category: savedCategory
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "category creation failed",
            error: error.message
        })
    }
}

// edit tag handler 
const editCategory = async (req, res) => {
    try {
        const { name, description, categoryId } = req.body;

        if(!name || !description || !categoryId){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            })
        }

        // check category exist or not   
        const isExist = await Category.findById(categoryId);
        if(!isExist){
            return res.status(404).json({
                success: false,
                message: "category not found",
            })
        }

        const category = await Category.findByIdAndUpdate(categoryId, { name, description }, {new: true});

        return res.status(200).json({
            success: true,
            message: "category updated successfully",
            category
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "category update failed",
            error: error.message
        })  
    }
}

// delete tag handler 
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;
        
        // check tag exist or not 
        const isExist = await Category.findById(categoryId);
        if(!isExist){
            return res.status(404).json({
                success: false,
                message: "category not found",
            })
        }        
        
        await Category.findByIdAndDelete(categoryId);

        return res.status(200).json({
            success: true,
            message: "category deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "category delete failed",
            error: error.message
        })  
    }
}

// get all tags handler
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).populate("courses");
        return res.status(200).json({
            success: true,
            message: "category fetched successfully",
            categories
        })  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "category fetched failed",
            error: error.message
        })
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    editCategory,
    deleteCategory
} 