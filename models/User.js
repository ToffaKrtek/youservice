const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userScheme = new Schema({
    
    login: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    //chat_id: {},
    tel: {
        type: String,
        required: true,
        unique: true
    },

    card_id: {
        type : String,
        default: ''
    },

    role: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('users', userScheme)