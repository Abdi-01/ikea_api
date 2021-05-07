const express = require('express')
const { userController } = require('../controllers')
const router = express.Router()

router.get('/get-all', userController.getUsers)
router.post('/login', userController.login)
router.post('/keep', userController.keeplogin)
router.post('/regis', userController.register)

module.exports = router