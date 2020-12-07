const express = require('express')
const controller = require('../controllers/users')
const router = express.Router()

const passport = require('passport')

router.get('/', controller.getAll)
router.post('/', controller.create)
router.patch('/', controller.update)

module.exports = router