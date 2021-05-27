const router = require('express').Router()
const { productController } = require('../controllers')

router.get('/get-all', productController.getProducts)
router.post('/post', productController.addProduct)
router.delete('/delete', productController.deleteProduct)
router.patch('/update', productController.updateProduct)

module.exports = router