const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        password: {
            type: String,
            required: [true, 'Please add a password']
        },
        gold: {
            type: Number,
            required: [true, 'Please add gold']
        },
        charCode: {
            type: Number,
            required: [true, 'Please add charCode']
        },
        purchases: {
            type: String,
            required: [true]
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)