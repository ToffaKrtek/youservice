const express = require('express')
const controller = require('../controllers/orders')
const router = express.Router()

const passport = require('passport')

router.get('/', controller.getAll)
router.post('/', controller.create)

module.exports = router