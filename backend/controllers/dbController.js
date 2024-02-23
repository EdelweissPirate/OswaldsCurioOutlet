const asyncHandler = require('express-async-handler')
const axios = require('axios')
const Category = require('../models/categoryModel');

// @desc assign Items to DB Categories
// @route /api/db/assignItems
// @access Private
const assignItemsDBCategories = asyncHandler(async (req, res) => {
    axios.defaults.baseURL = "https://www.dnd5eapi.co"
    
    const categories = await axios.get("/api/equipment-categories")
        .then(response => {
            return response.data.results.map(category => category.index)
        })
        .catch(err => {throw new Error("error getting categories.", err)})

    const productURLs = await Promise.all(categories.map(async (category) => {
        return await axios.get('/api/equipment-categories/' + category)
            .then(response => {
                return response.data.equipment.map(product => product.url)
            })
            .catch(err => {throw new Error("error getting product urls.", err)})
    }))

    const products = await Promise.all(productURLs.flat().map(async (url) => {
        return await axios.get(url)
            .then(response => {
                return response.data
            })
            .catch(err => {throw new Error("error getting products", err)})
    }))

    const filteredProducts = products.filter(prod => prod.cost)
    
    const prodLists = {
        'adventuring-gear': [],
        'weapon': [],
        'tools': [],
        'armor': [],
        'mounts-and-vehicles': []
    }

    try {
        await Promise.all(filteredProducts.map(async (product) => {
            try {
                const category = await Category.findOne({ name: product.equipment_category.index });
                if (!category) {
                    throw new Error(`Category not found for product ${product.index}`);
                }
    
                const list = prodLists[category.name]
    
                if(!list) return null
    
                if (list.some(prod => prod.index === product.index)) return null
    
                list.push(product)
    
                return product
    
            } catch (error) {
                console.error(`Failed to add product ${product.index}: ${error.message}`);
                return null;
            }
        }))
    
        const _cats = await Category.find()
    
        await Promise.all(_cats.map(async cat => {
            cat.products = JSON.stringify(prodLists[cat.name])
    
            await cat.save()
                .then((updatedCat) => {
                    return updatedCat
                })
        }))
    
        res.status(200).json(
            {
                message: "Items assigned to categories"
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                message: "Failed to assign items"
            }
        )
    }
})

// @desc create All DB Categories
// @route /api/db/createAllDBCategories
// @access Private
const createAllDBCategories = asyncHandler(async (req, res) => {
    axios.defaults.baseURL = "https://www.dnd5eapi.co"

    try {
        const categories = await axios.get("/api/equipment-categories")
            .then(response => {
                return response.data.results.map(category => category.index)
            })
            .catch(err => {throw new Error("error getting categories.", err)})
            
        const createdCategories = await Promise.all(categories.map(async (category) => {
            const name = category

            let categoryExists = await Category.findOne({ name })

            if(!categoryExists){
                //Create category
                    categoryExists = await Category.create({
                        name,
                        products: '[]'
                    })
                }

            return categoryExists
        }))

        res.status(201).json(
            {
                message: `successfully created ${createdCategories.length} categories`
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

// @desc delete All DB Categories
// @route /api/db/deleteCategories
// @access Private
const deleteAllDBCategories = asyncHandler(async (req, res) => {
    axios.defaults.baseURL = "https://www.dnd5eapi.co"

    try {
        const categories = await Category.find() 

        await categories.map(async category => {
            await Category.deleteOne({_id: category._id})
        })

        res.status(204).json(
            {
                message: "successfully deleted all categories"
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
    createAllDBCategories,
    assignItemsDBCategories,
    deleteAllDBCategories
}
