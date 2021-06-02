const { dbQuery, db } = require('../config/database')

module.exports = {
    getCart: async (req, res, next) => {
        try {
            // data yg diambil : iduser, idproduct,nama, gambar, harga, type, qty(stock), idstock, qty 
            let queryGet = `Select c.idcart, c.iduser, p.idproduct, p.nama, p.harga, ps.type, ps.qty as qty_stock,
            ps.idproduct_stock, c.qty from cart c Join products p on c.idproduct = p.idproduct
            JOIN product_stock ps on ps.idproduct_stock = c.idstock 
            WHERE c.iduser=${req.params.iduser};`
            queryGet = await dbQuery(queryGet)
            getImage = await dbQuery(`Select * from product_image;`)
            queryGet.forEach(item => {
                item.images = []
                getImage.forEach(e => {
                    if (item.idproduct == e.idproduct) {
                        item.images.push(e)
                    }
                })
            })
            res.status(200).send(queryGet)
        } catch (error) {
            next(error)
        }
    },
    addCart: async (req, res, next) => {
        try {
            console.log(req.body)
            let queryInsert = `Insert into cart set ?`
            queryInsert = await dbQuery(queryInsert, req.body)
            res.status(200).send({ status: "Success✅", results: queryInsert })
        } catch (error) {
            next(error)
        }
    },
    updateCartQty: async (req, res, next) => {
        try {
            let queryUpdate = await dbQuery(`Update cart set qty = ${req.body.qty} 
            where idcart=${req.body.idcart};`)
            res.status(200).send({ status: "Success✅", results: queryUpdate })
        } catch (error) {
            next(error)
        }
    },
    deleteCart: async (req, res, next) => {
        try {
            let queryUpdate = await dbQuery(`Delete from cart where idcart=${req.params.idcart};`)
            res.status(200).send({ status: "Success✅", results: queryUpdate })
        } catch (error) {
            next(error)
        }
    },
    getTransaksi: async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    },
    addCheckout: async (req, res, next) => {
        try {
            console.log(req.body)
            let { invoice, iduser, ongkir, total_payment, note, idstatus, detail } = req.body
            let insertQuery = `Insert into transactions set ?`
            insertQuery = await dbQuery(insertQuery, { invoice, iduser, ongkir, total_payment, note, idstatus })
            // console.log("Checkout Success ✅", insertQuery)
            let detailQuery = `Insert into transaction_detail (idtransaction,idproduct,idstock,qty) values ?`
            let dataDetail = detail.map(item => [insertQuery.insertId, item.idproduct, item.idstock, item.qty])
            // console.log(dataDetail)
            detailQuery = await dbQuery(detailQuery, [dataDetail])
            // console.log("Checkout Detail Success ✅",detailQuery)
            let deleteCart = `Delete from cart where (idcart,iduser) IN (?) ;`
            let delCart = detail.map(item => [item.idcart, iduser])
            deleteCart = await dbQuery(deleteCart, [delCart])
            console.log("Checkout Success ✅", detailQuery)
        } catch (error) {
            next(error)
        }
    }
}