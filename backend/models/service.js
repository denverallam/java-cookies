const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, '100 characters only']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product name'],
        maxLength: [100, '100 characters only']
    },
    images: {
        type: Array,
        required: [true, 'Please enter product image'],
    },
    category: {
        type: String,
        required: [true, 'Please select category'],
        trim: true,
        maxLength: [100, '100 characters only']
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter user"],
        ref: "User"
    },
    updated_at: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    updated_by:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter user"],
        ref: "User"
    }
})

module.exports = mongoose.model('Service', serviceSchema)

