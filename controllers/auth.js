const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res){
    const candidate = await User.findOne({tel: req.body.tel})

    if(candidate) {
        //Проверяем есть пользователь с данным номером
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){

            //Пароль совпал - генерация токена
            const token = jwt.sign({
                tel: candidate.tel,
                login: candidate.login,
                card_id: candidate.card_id,
                role: candidate.role,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            //Пароль не совпал
            res.status(401).json({
                message: "Неправильный пароль"
            })
        }
    } else {
        // Номер не зарегестрирован
        res.status(404).json({
            message: "Данный номер не зарегестрирован"
        })
    }
}

module.exports.register = async function(req, res){
    //Проверка номера телефона на уникальность
    const candidate = await User.findOne({tel: req.body.tel})

    if (candidate){
        //Если номер неуникален
        res.status(409).json({
            message:"К данному номеру уже привязан аккаунт"
        })
    } else {
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password

        const user = new User({
            login: req.body.login,
            password: bcrypt.hashSync(password, salt),
            tel: req.body.tel,
            role: req.body.role,
            card_id : req.body.card_id ? req.body.card_id : ''
            
        })
        if(req.body.role) {
            //Проверяем поле роли, если пустое, значит обычный пользователь, 
            //если 1 - исполнитель.. не может быть равно 2 (админ) 
            //- админы назначаются только из уже зарегестрированных пользователей
            if(req.body.role != 2) {   
            user.role = req.body.role
            }
        }
        
        try {
            await user.save()
            res.status(200).json(user)
        } catch(e) {
            errorHandler(res, e)
        }
    }
}