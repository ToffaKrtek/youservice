const Location = require('../models/Location')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function(req, res) {
    try {
        const locate = await Location.find({})
        res.status(200).json(locate)
    } catch (e) {
        errorHandler(res, e)
    }
}
module.exports.getById = async function(req, res) { 
    try {
        //Передаем id юзера, а не id записи в БД
        const locate = await Location.findOne({user_id: req.params.id})
        res.status(200).json(locate)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function(req, res) { 
    try {
        const locate = await new Location({
            user_id: req.user.id,
            location_point: req.body.location_point,
        }).save()
        res.status(201).json(locate)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) { 
    try {
        const locate = await Location.findOneAndUpdate(
            //Передаем id юзера, а не id записи в БД
            {user_id: req.params.id},
            {$set: req.body},
            {new: true}
            )
        res.status(200).json(locate)
    } catch (e) {
        errorHandler(res, e)
    }
}