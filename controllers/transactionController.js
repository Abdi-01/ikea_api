const { dbQuery, db } = require('../config/database')

module.exports = {
    getCart: async (req, res, next) => {
        try {
            // data yg diambil : iduser, idproduct,nama, gambar, harga, type, qty(stock), idstock, qty 
            let queryGet = `Select c.iduser, p.idproduct, p.nama, p.harga, ps.type, ps.qty as qty_stock,
            ps.idproduct_stock, c.qty from cart c Join products p on c.idproduct = p.idproduct
            JOIN product_stock ps on ps.idproduct_stock = c.idstock 
            WHERE c.iduser=${req.params.iduser};`
            queryGet = await dbQuery(queryGet)
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
    updateCart: async (req, res, next) => {

    },
    deleteCart: async (req, res, next) => {

    }
}