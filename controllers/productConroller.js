const { db, dbQuery, uploader } = require('../config')

module.exports = {
    getProducts: async (req, res) => {
        try {
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

            let get = await dbQuery(getSQL)
            let getImg = await dbQuery(getImage)
            let getStck = await dbQuery(getStock)
            // Looping results data product
            get.forEach(item => {
                // membuat properti images untuk product
                item.images = []
                // Looping results_img untuk dicocokkan foreign key-nya dgn
                // results data products
                getImg.forEach(e => {
                    // jika id sama, data results_img akan dimasukkan kedalam properti baru item.images
                    if (item.idproduct == e.idproduct) {
                        item.images.push(e)
                    }
                })

                item.stock = []
                getStck.forEach(e => {
                    if (item.idproduct == e.idproduct) {
                        item.stock.push({
                            idproduct_stock: e.idproduct_stock,
                            type: e.type,
                            qty: e.qty,
                            status: e.status
                        })
                    }
                })
            });
            res.status(200).send(get)
        } catch (error) {
            res.status(500).send({ status: 'Error Mysql', messages: error })
        }
    },
    addProduct: async (req, res, next) => {
        try {
            // let postProduct = `Insert into products values (null,${db.escape(req.body.nama)},${db.escape(req.body.brand)},
            // ${db.escape(req.body.deskripsi)},${db.escape(req.body.harga)},
            // ${db.escape(req.body.idstatus)});`
            // let postImage = `Insert into product_image values `
            // let postStock = `Insert into product_stock values `

            // // get all idcategory dari child->parent
            // let getIdCategory = `WITH RECURSIVE category_path (idcategory, category, parent_id) AS
            // (
            //   SELECT idcategory, category, parent_id
            //     FROM category
            //     WHERE idcategory = ${req.body.idcategory} -- kategory paling bawah yg dipilih
            //   UNION ALL
            //   SELECT c.idcategory, c.category, c.parent_id
            //     FROM category_path AS cp JOIN category AS c
            //       ON cp.parent_id = c.idcategory
            // )
            // SELECT * FROM category_path;`

            // getIdCategory = await dbQuery(getIdCategory)
            // console.log(getIdCategory)

            // postProduct = await dbQuery(postProduct)
            // if (postProduct.insertId) {
            //     // query untuk insert data ke table product_category
            //     getIdCategory = getIdCategory.map(item => [postProduct.insertId, item.idcategory])

            //     await dbQuery(`insert into product_category (idproduct,idcategory) values ?`, [getIdCategory])
            //     // menjalankan insert untuk product_img dan product_stck
            //     let dataStock = []
            //     req.body.stock.forEach(item => {
            //         dataStock.push(`(null,${postProduct.insertId},${db.escape(item.type)},${db.escape(item.qty)},${db.escape(req.body.idstatus)})`)
            //     })
            //     await dbQuery(postStock + dataStock)

            //     // upload image 
            //     let dataImg = []
            //     req.body.images.forEach(item => {
            //         dataImg.push(`(null,${postProduct.insertId},${db.escape(item)})`)
            //     })
            //     await dbQuery(postImage + dataImg)

            const upload = uploader('/images', 'IMG').fields([{ name: 'images' }])

            upload(req, res, (error) => {
                if (error) {
                    next(error)
                }

                const { images } = req.files
                console.log("cek file upload :", images)
                console.log(JSON.parse(req.body.data))
            })

            // res.status(200).send("Insert product success ✅")
            // }
        } catch (error) {
            res.status(500).send({ status: 'Error Mysql', messages: error })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await dbQuery(`Update products set idstatus = 2 where idproduct=${req.query.id};`)
            res.status(200).send("Delete product success ✅")
        } catch (error) {
            res.status(500).send({ status: 'Error Mysql', messages: error })
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            console.log("data update", req.body)
            let { idproduct, nama, brand, deskripsi, harga, idstatus, images, stock } = req.body

            // update product_images
            let updateImages = images.map(item => `Update product_image set images=${db.escape(item.images)} 
            where idproduct_image=${db.escape(item.idproduct_image)};`)
            // console.log("queryImage", updateImages.join('\n'))

            // update product_stock
            let updateStocks = stock.map(item => `Update product_stock set type=${db.escape(item.type)},qty=${item.qty} 
            where idproduct_stock = ${item.idproduct_stock};`)

            // update product master
            let update = `Update products set nama=${db.escape(nama)}, brand=${db.escape(brand)}, deskripsi=${db.escape(deskripsi)},
            harga=${db.escape(harga)}, idstatus=${db.escape(idstatus)} 
            where idproduct=${db.escape(idproduct)};
            ${updateImages.join('\n')}
            ${updateStocks.join('\n')}`

            await dbQuery(update)
            res.status(200).send("Update Product, Stocks and Images Success ✅")
        } catch (error) {
            next(error)
        }
    }
}



/**
 * Backup updateController
 * updateProduct: (req, res) => {
        console.log("data update", req.body)
        let { idproduct, nama, brand, deskripsi, harga, idstatus, images, stock } = req.body
        let update = `Update products set nama=${db.escape(nama)}, brand=${db.escape(brand)}, deskripsi=${db.escape(deskripsi)},
        harga=${db.escape(harga)}, idstatus=${db.escape(idstatus)} where idproduct=${db.escape(idproduct)};`

        db.query(update, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'Error Mysql', messages: err })
            }
            console.log("Update Product Success ✅", results)

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
                    res.status(200).send("Update Product, Stocks and Images Success ✅")
                })

            })

        })
    }
 */