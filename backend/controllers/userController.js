const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const axios = require('axios')

const API_CHAR = "https://character-service.dndbeyond.com/character/v5/character" //116176545

async function getCharData(charCode){
    return await axios.get('/' + charCode)
}

// @desc Register a new user
// @route /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, charCode, password } = req.body

    // Validate req data
    if(!name || !password || !charCode){
        res.status(400)
        throw new Error('Please include all fields')
    }

    axios.defaults.baseURL = API_CHAR

    const charData = await axios.get('/' + charCode)
        .then(response => response.data.data)
        .catch(() => {
            res.status(400)
            throw Error('Failed to get character data')
        })

    const gold = charData.currencies.gp + (charData.currencies.sp * 0.1) + (charData.currencies.cp * 0.01)

    //Find if user already exists
    const userExists = await User.findOne({ charCode })

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a Date object using the timestamp
    const currentDate = new Date(Date.now());

    // Get day, month, and year components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const year = currentDate.getFullYear() % 100; // Get last two digits of the year
    const formattedDate = `${day}/${month}/${year}`;

    const defaultPurchase = [
        {
            id: 0,
            quantity: 0,
            name: "DEFAULT", 
            date: formattedDate
        }
    ]

    const purchases = JSON.stringify(defaultPurchase)

    //Create user
    const user = await User.create({
        name,
        charCode,
        password: hashedPassword,
        gold,
        purchases
    })

    if(user){
        res.status(201).json({
            message: 'Name recorded',
            name: user.name,
            gold: user.gold,
            charCode: charCode,
            purchases: user.purchases,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data.')
    }
})

// @desc Login a user
// @route /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { name, password } = req.body

    const user = await User.findOne({ name })

    if(!user) {
        res.status(401)
        throw new Error('Invalid credentials.')
    }

    const passwordVerified = await bcrypt.compare(password, user.password)
    
    if(!passwordVerified) {
        res.status(401)
        throw new Error('Invalid credentials.')
    }
    
    axios.defaults.baseURL = API_CHAR

    const charData = await axios.get('/' + user.charCode)
        .then(response => response.data.data)
        .catch(() => {
            res.status(400)
            throw Error('Failed to get character data')
        })

    const gold = charData.currencies.gp + (charData.currencies.sp * 0.1) + (charData.currencies.cp * 0.01)

    user.gold = gold

    user.save()
    .then(updatedUser => {
        res.status(200).json({
            message: "Welcome, Traveller!",
            name: updatedUser.name,
            charCode: updatedUser.charCode,
            token: generateToken(updatedUser._id),
            gold: updatedUser.gold,
            purchases: updatedUser.purchases
        })
    })
    .catch(error => {
        res.status(500)
        throw new Error('Login failed.', error)
    })
})

// @desc Get current user
// @route /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        message: 'Your profile',
        id: req.user._id,
        name: req.user.name,
        gold: req.user.gold,
        purchases: req.user.purchases
    }
    
    res.status(200).json(user)
})

// @desc Delete current user
// @route /api/users/remove
// @access Private
const removeUser = asyncHandler(async (req, res) => {
    if(!req.user.isAdmin) {
        res.status(401)
        throw new Error('Not admin.')
    }

    const { charCode } = req.body
    const user = await User.findOne({ charCode })
    // const user = await User.findOne({ name })

    if(user){
        try {
            await User.deleteOne({ _id: user._id });
            res.status(200).json({
                message: user.name + " stricken from the records."
            });
        } catch (err) {
            res.status(500);
            throw new Error('Error deleting user.', err);
        }
    } else {
        res.status(401)
        throw new Error('Invalid user.')
    }
})

// @desc Get all users purchases
// @route /api/users/purchases
// @access Private
const getPurchases = asyncHandler(async (req, res) => {
    if(!req.user.isAdmin) {
        res.status(401)
        throw new Error('Do you work here?')
    }

    const users = await User.find()    
    
    if(!users){
        res.status(500)
        throw new Error('Records unfound.')
    }

    const output = users.map(user => {
        return {
            name: user.name,
            gold: user.gold,
            purchases: user.purchases
        }
    })

    res.status(200).json(
        output
    )
})

// @desc Put user purchase
// @route /api/users/buy
// @access Private
const doPurchase = asyncHandler(async (req, res) => {
    const { name, purchases, total } = req.body
    
    if(!name || !purchases || !total){
        res.status(500)
        throw new Error('Invalid purchase.')
    }

    const user = await User.findOne({ name })    
    
    if(!user){
        res.status(500)
        throw new Error('Cannot find profile.')
    }

    if(user.gold < total){
        res.status(401)
        throw new Error('Not enough gold!')
    }

    user.gold -= total

    const userPurchaseList = JSON.parse(user.purchases)
    const parsedPurchase = JSON.parse(purchases)

    const newPurchasesList = [...userPurchaseList, ...parsedPurchase]

    user.purchases = JSON.stringify(newPurchasesList)

    user.save()
        .then(updatedUser => {
            res.status(200).json({
                message: "Thank you, come again!",
                name: updatedUser.name,
                gold: updatedUser.gold,
                purchases: updatedUser.purchases
            })
        })
        .catch(error => {
            res.status(500)
            throw new Error('Purchase failed.', error)
        });
})

// @desc Post gold to user
// @route /api/users/addGold
// @access Private
const addGold = asyncHandler(async (req, res) => {
    if(!req.user.isAdmin) {
        res.status(401)
        throw new Error('Do you work here?')
    }

    const { name, amount } = req.body

    if(!name || !amount){
        res.status(500)
        throw new Error('Invalid request.')
    }

    const user = await User.findOne({ name })

    if(!user){
        res.status(500)
        throw new Error('Cannot find profile.')
    }

    user.gold += amount

    user.save()
        .then(updatedUser => {
            res.status(200).json({
                message: "Gold update successful!",
                name: updatedUser.name,
                gold: updatedUser.gold
            })
        })
        .catch(error => {
            res.status(500)
            throw new Error('Purchase failed.', error)
        });
})

//Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '12h'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    removeUser,
    getPurchases,
    doPurchase,
    addGold
}