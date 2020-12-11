const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')


module.exports.getAll = async function(req, res) {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function(req, res) { 
    try {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.remove = async function(req, res) { 
    try {
        await Order.remove({_id: req.params.id})
        res.status(200).json({
            message: "Заказ удален"
        })
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.create = async function(req, res) { 
    try {
        const order = await new Order({
            user_id: req.user.id,
            way_start: req.body.way_start,
            way_end: req.body.way_end,
            comments: req.body.comments ? req.body.comments : '',
            price: req.body.price
        }).save()
        res.status(201).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) { 
    try {
        const order = await Order.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(order)
    } catch (e) {
        errorHandler(res, e)
    }
}