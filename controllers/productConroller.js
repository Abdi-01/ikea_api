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
            getSQL = `Select * from products p JOIN status s on p.idstatus = s.idstatus where p.idstatus=1;`
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
                            item.images.push(e)
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
        console.log(req.body)

        let postProduct = `Insert into products values (null,${db.escape(req.body.nama)},${db.escape(req.body.brand)},
        ${db.escape(req.body.deskripsi)},${db.escape(req.body.harga)},
        ${db.escape(req.body.idstatus)});`
        let postImage = `Insert into product_image values `
        let postStock = `Insert into product_stock values `

        db.query(postProduct, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'Error Mysql', messages: err })
            }

            console.log("result produk", results)
            if (results.insertId) {
                // menjalankan insert untuk product_img dan product_stck
                let dataImg = []
                req.body.images.forEach(item => {
                    dataImg.push(`(null,${results.insertId},${db.escape(item)})`)
                })
                let dataStock = []
                req.body.stock.forEach(item => {
                    dataStock.push(`(null,${results.insertId},${db.escape(item.type)},${db.escape(item.qty)},${db.escape(req.body.idstatus)})`)
                })

                // console.log(postImage + dataImg)
                // console.log(postStock + dataStock)
                db.query(postImage + dataImg, (err_img, results_img) => {
                    if (err_img) {
                        res.status(500).send({ status: 'Error Mysql', messages: err_img })
                    }
                    db.query(postStock + dataStock, (err_stck, results_stck) => {
                        if (err_stck) {
                            res.status(500).send({ status: 'Error Mysql', messages: err_stck })
                        }

                        res.status(200).send("Insert product success ???")
                    })
                })
            }
        })

    },
    deleteProduct: (req, res) => {
        let delQuery = `Update products set idstatus = 2 where idproduct=${req.query.id};`
        db.query(delQuery, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'Error Mysql', messages: err })
            }

            res.status(200).send("Delete product success ???")
        })
    },
    updateProduct: (req, res) => {
        console.log("data update", req.body)
        let { idproduct, nama, brand, deskripsi, harga, idstatus, images, stock } = req.body
        let update = `Update products set nama=${db.escape(nama)}, brand=${db.escape(brand)}, deskripsi=${db.escape(deskripsi)},
        harga=${db.escape(harga)}, idstatus=${db.escape(idstatus)} where idproduct=${db.escape(idproduct)};`

        db.query(update, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'Error Mysql', messages: err })
            }
            console.log("Update Product Success ???", results)

            // update images dan stock
            let updateImages = images.map(item => `Update product_image set images=${db.escape(item.images)} 
            where idproduct_image=${db.escape(item.idproduct_image)};`)
            console.log("queryImage", updateImages.join('\n'))

            let updateStocks = stock.map(item => `Update product_stock set type=${db.escape(item.type)},qty=${item.qty} 
            where idproduct_stock = ${item.idproduct_stock};`)

            db.query(updateImages.join('\n'), (err_img, results_img) => {
                if (err_img) {
                    res.status(500).send({ status: 'Error Mysql', messages: err_img })
                }
                
                db.query(updateStocks.join('\n'),(err_stck,results_stck)=>{
                    if (err_stck) {
                        res.status(500).send({ status: 'Error Mysql', messages: err_stck })
                    }
                    res.status(200).send("Update Product, Stocks and Images Success ???")
                })

            })

        })
    }
}