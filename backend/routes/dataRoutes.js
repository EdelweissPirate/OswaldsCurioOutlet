const express = require('express');
const router = express.Router()
const {
    getCategories,
    getProducts
} = require('../controllers/dataController');

const protect = require('../middleware/authMiddleware');

router.get('/getCategories', protect, getCategories)
router.get('/getProducts', protect, getProducts)

module.exports = router