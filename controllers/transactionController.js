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
            let getCart = `Select * from cart where idproduct=${req.body.idproduct} and idstock=${req.body.idstock};`
            getCart = await dbQuery(getCart)
            if (getCart.length > 0) {
                let queryUpdate = `Update cart set qty=${getCart[0].qty + req.body.qty} where idcart=${getCart[0].idcart};`
                queryUpdate = await dbQuery(queryUpdate)
            } else {
                let queryInsert = `Insert into cart set ?`
                queryInsert = await dbQuery(queryInsert, { iduser: req.user.iduser, ...req.body })
            }
            res.status(200).send({ status: "Success✅" })
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
            let getQuery = `Select *, u.username from transactions t join users u on t.iduser=u.iduser join status s on t.idstatus=s.idstatus ${req.user.iduser > 0 ? `where t.iduser=${req.user.iduser}` : ' '};`
            getQuery = await dbQuery(getQuery)
            // console.log(getQuery)

            let getDetail = `Select p.nama,p.harga,ps.type,td.* from transaction_detail td join products p on td.idproduct = p.idproduct
            join product_stock ps on ps.idproduct_stock = td.idstock;`
            getDetail = await dbQuery(getDetail)

            getQuery.forEach((item) => {
                item.transaction_detail = []
                getDetail.forEach((element) => {
                    if (item.idtransaction == element.idtransaction) {
                        item.transaction_detail.push(element)
                    }
                })
            })
            res.status(200).send({ status: "Success✅", results: getQuery })
        } catch (error) {
            next(error)
        }
    },
    addCheckout: async (req, res, next) => {
        try {
            console.log(req.body)
            let { invoice, ongkir, total_payment, note, idstatus, detail } = req.body
            let insertQuery = `Insert into transactions set ?`
            insertQuery = await dbQuery(insertQuery, { invoice, iduser:req.user.iduser, ongkir, total_payment, note, idstatus })
            // console.log("Checkout Success ✅", insertQuery)

            let detailQuery = `Insert into transaction_detail (idtransaction,idproduct,idstock,qty) values ?`
            let dataDetail = detail.map(item => [insertQuery.insertId, item.idproduct, item.idproduct_stock, item.qty])
            detailQuery = await dbQuery(detailQuery, [dataDetail])
            // console.log("Checkout Detail Success ✅",detailQuery)

            let deleteCart = `Delete from cart where (idcart,iduser) IN (?) ;`
            let delCart = detail.map(item => [item.idcart, iduser])
            deleteCart = await dbQuery(deleteCart, [delCart])
            // console.log("Checkout Success ✅", detailQuery)
            res.status(200).send({ success: true, message: "Checkout Success ✅" })
        } catch (error) {
            next(error)
        }
    }
}

// Tugas :
/**
 * 1. Hubungkan data transaksi dengan page histroy transaction
 * 2. Tampilkan saja kolom no, tgl, invoice, total payment, status, action
 * 3. Pada sisi admin tambahkan button Confirm,
 *    yg nantinya digunakan untuk merubah status dari UNPAID --> PAID
 * 4. Pada sisi admin dan user, juga tambahkan button detail utk
 *    menampilkan modal yang berisi detail transaksi beserta
 *    data transaksi lainnya secara lengkap
 */