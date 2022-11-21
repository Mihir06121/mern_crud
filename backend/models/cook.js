const mongoose = require('mongoose')

const cookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    cuisines: [{
        type: String,
    }],
    city: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('cook', cookSchema)