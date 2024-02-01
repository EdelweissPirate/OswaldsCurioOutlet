const express = require('express');
const router = express.Router()
const {
    registerUser, 
    loginUser, 
    getMe, 
    removeUser, 
    getPurchases, 
    doPurchase,
    addGold
} = require('../controllers/userController');

const protect = require('../middleware/authMiddleware');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.delete('/remove', protect, removeUser)
router.get('/purchases', protect, getPurchases)
router.post('/buy', protect, doPurchase)
router.post('/addGold', protect, addGold)

module.exports = router