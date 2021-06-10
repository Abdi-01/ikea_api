const express = require('express')
const { readToken } = require('../config')
const { userController } = require('../controllers')
const router = express.Router()

router.get('/get-all', userController.getUsers)
router.post('/login', userController.login)
router.post('/keep', readToken, userController.keeplogin)
router.post('/regis', userController.register)
router.patch('/verification', readToken, userController.verification)
router.patch('/reverification', userController.reVerification)

module.exports = router