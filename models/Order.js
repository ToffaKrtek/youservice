const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderScheme = new Schema({
    user_id: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true
    },
    way_start: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
          type: [Number],
          required: true
      }  
    },
    way_end: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
      },
    time_created: {
        type: Date, 
        default: Date.now
    },
    comments: {
        type: String,
        default: ''
    },
    confirm: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    price: {
        type: Number,
        required: true
    },
    driver_id: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        default: ''  //возможно создать неактивного аользователя, если будет ругаться что отдаём пустую строку вместо референции на реального пользователя
    }
})

module.exports = mongoose.model('orders', orderScheme)