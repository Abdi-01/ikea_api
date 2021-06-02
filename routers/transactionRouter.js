const router = require('express').Router()
const { transactionController } = require('../controllers')

// API CART
router.get('/get-cart/:iduser', transactionController.getCart)
router.post('/post-cart', transactionController.addCart)
router.delete('/delete-cart/:idcart', transactionController.deleteCart)
router.patch('/update-qty', transactionController.updateCartQty)

// API Transaksi
router.post('/checkout', transactionController.addCheckout)
router.get('/data', transactionController.getTransaksi)

module.exports = router