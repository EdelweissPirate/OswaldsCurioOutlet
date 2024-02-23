const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        products: {
            type: String,
            required: [true, 'Please add products']
        }
    }, 
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Category', categorySchema)