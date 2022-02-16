const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, '100 characters only'],
        unique: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter user"],
        ref: "User"
    }
})

module.exports = mongoose.model('Category', categorySchema)

