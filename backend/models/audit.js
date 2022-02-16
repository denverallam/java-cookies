const mongoose = require('mongoose')

const auditSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, '100 characters only'],
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter user"],
        ref: "User"
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Audit', auditSchema)

