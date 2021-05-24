const router = require('express').Router()
const { productController } = require('../controllers')

router.get('/get-all', productController.getProducts)

module.exports = router