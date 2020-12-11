const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationScheme = new Schema({
    user_id: {
        ref: 'users',
        type: Schema.Types.ObjectId,
        required: true
    },
    location_point: {
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
    last_updated: {
        type: Date, 
        default: Date.now
    },
    active: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('locations', locationScheme)