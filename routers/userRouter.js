const express = require('express')
const { userController } = require('../controllers')
const router = express.Router()

router.get('/get-all', userController.getUsers)
router.get('/login', userController.login)
router.post('/regis', userController.register)

module.exports = router