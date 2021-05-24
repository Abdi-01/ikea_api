const { db } = require('../config/database')

module.exports = {
    getProducts: (req, res) => {
        let dataSearch = [], getSQL, getImage = `Select * from product_image`;
        let getStock = 'Select * from product_stock ps JOIN status s on ps.idstatus = s.idstatus; '
        for (let prop in req.query) {
            dataSearch.push(`${prop} = ${db.escape(req.query[prop])}`)
        }

        if (dataSearch.length > 0) {
            getSQL = `Select * from products p JOIN status s on p.idstatus = s.idstatus Where ${dataSearch.join(' AND ')};`
        } else {
            getSQL = `Select * from products p JOIN status s on p.idstatus = s.idstatus;`
        }

        db.query(getSQL, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'Error Mysql', messages: err })
            }

            db.query(getImage, (err_img, results_img) => {
                if (err_img) {
                    res.status(500).send({ status: 'Error Mysql', messages: err_img })
                }
                // Looping results data product
                results.forEach(item => {
                    // membuat properti images untuk product
                    item.images = []
                    // Looping results_img untuk dicocokkan foreign key-nya dgn
                    // results data products
                    results_img.forEach(e => {
                        // jika id sama, data results_img akan dimasukkan kedalam properti baru item.images
                        if (item.idproduct == e.idproduct) {
                            item.images.push(e.images)
                        }
                    })
                });

                db.query(getStock, (err_stck, results_stck) => {
                    if (err_stck) {
                        res.status(500).send({ status: 'Error Mysql', messages: err_stck })
                    }

                    results.forEach(item => {
                        item.stock = []
                        results_stck.forEach(e => {
                            if (item.idproduct == e.idproduct) {
                                item.stock.push({
                                    idproduct_stock: e.idproduct_stock,
                                    type: e.type,
                                    qty: e.qty,
                                    status: e.status
                                })
                            }
                        })
                    })
                    console.log(results)
                    res.status(200).send(results)
                })

            })
        })

    },
    addProduct: (req, res) => {

    }
}