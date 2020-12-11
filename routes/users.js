const express = require('express')
const controller = require('../controllers/users')
const router = express.Router()

//const passport = require('passport')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.patch('/:id', controller.update)

module.exports = router