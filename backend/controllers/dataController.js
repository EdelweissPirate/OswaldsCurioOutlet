const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel');

// @desc Get category names
// @route /api/data/getCategories
// @access Private
const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find() 
        const catNames = categories.map(cat => {
            return cat.name
        })

        res.status(200).json(
            {
                categories: JSON.stringify(catNames)
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                message: "Server Error"
            }
        )
    }
})

// @desc Get products
// @route /api/data/getProducts
// @access Private
const getProducts = asyncHandler(async (req, res) => {
    try {
        const { name } = req.query 

        const category = await Category.findOne({ name }) 
        
        res.status(200).json(
            {
                products: category.products
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                message: "Server Error"
            }
        )
    }
})

module.exports = {
    getCategories,
    getProducts
}