const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
    created_at: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    updated_at: {
        type: Date,
        required: true,
        default: new Date(Date.now())
    },
    // created_by:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: [true, "Please enter user"],
    //     ref: "User"
    // },
    available:{
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: [0, "Please enter stock"]
    }
})

module.exports = mongoose.model('Product', productSchema)

