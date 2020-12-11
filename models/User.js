const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userScheme = new Schema({
    role: {
        type: Number,
        default: 0,
        required: true
    },
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
        type : String
    },
})

module.exports = mongoose.model('users', userScheme)