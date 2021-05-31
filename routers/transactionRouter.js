const router = require('express').Router()
const { transactionController } = require('../controllers')

router.get('/get-cart/:iduser', transactionController.getCart)
router.post('/post-cart', transactionController.addCart)
router.delete('/delete-cart', transactionController.deleteCart)
router.patch('/update-qty', transactionController.updateCartQty)

module.exports = router