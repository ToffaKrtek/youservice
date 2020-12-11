const express = require('express')
const controller = require('../controllers/orders')
const router = express.Router()

//const passport = require('passport')

router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.post('/', controller.create)
router.patch('/', controller.update)


module.exports = router