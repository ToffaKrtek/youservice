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
    password: {},
    chat_id: {},
    tel: {},
    card_id: {},
})

module.exports = mongoose.model('users', userScheme)