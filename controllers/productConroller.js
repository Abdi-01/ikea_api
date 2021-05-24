const { db } = require('../config/database')

module.exports = {
    getProducts: (req, res) => {
        let dataSearch = [], getSQL, getImage = `Select * from product_image`;
        for (let prop in req.query) {
            dataSearch.push(`${prop} = ${db.escape(req.query[prop])}`)
        }

        if (dataSearch.length > 0) {
            getSQL = `Select * from products Where ${dataSearch.join(' AND ')};`
        } else {
            getSQL = `Select * from products`
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

                console.log(results)
                res.status(200).send(results)
            })
        })

    },
    addProduct: (req, res) => {

    }
}