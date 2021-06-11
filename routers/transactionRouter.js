const router = require('express').Router()
const { readToken } = require('../config')
const { transactionController } = require('../controllers')

// API CART
router.get('/get-cart/:iduser', transactionController.getCart)
router.post('/post-cart', readToken, transactionController.addCart)
router.delete('/delete-cart/:idcart', transactionController.deleteCart)
router.patch('/update-qty', transactionController.updateCartQty)

// API Transaksi
router.post('/checkout', readToken, transactionController.addCheckout)
router.get('/data/:id', readToken, transactionController.getTransaksi)

module.exports = router