const express = require('express');
const router = express.Router()
const {
    createAllDBCategories,
    assignItemsDBCategories,
    deleteAllDBCategories
} = require('../controllers/dbController');

const protect = require('../middleware/authMiddleware');

router.post('/createCategories', protect, createAllDBCategories)
router.put('/assignItems', protect, assignItemsDBCategories)
router.delete('/deleteCategories', protect, deleteAllDBCategories)

module.exports = router