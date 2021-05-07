const { db } = require('../config/database')

module.exports = {
    getUsers: (req, res) => {
        // modifikasi fungsi
        let getSQL, dataSearch = [];
        for (let prop in req.query) {
            dataSearch.push(`${prop} = ${db.escape(req.query[prop])}`)
        }
        if (dataSearch.length > 0) {
            getSQL = `Select * from users WHERE ${dataSearch.join(' AND ')};`
        } else {
            getSQL = `Select * from users;`
        }

        db.query(getSQL, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'Error Mysql', messages: err })
            }
            res.status(200).send(results)
        })

    },
    login: (req, res) => {
        if (req.body.email && req.body.password) {
            let getSQL = `Select * from users where 
            email=${db.escape(req.body.email)} and password=${db.escape(req.body.password)};`

            db.query(getSQL, (err, results) => {
                if (err) {
                    res.status(500).send({ status: 'Error Mysql Login', messages: err })
                }
                if (results.length > 0) {
                    res.status(200).send(results)
                } else {
                    res.status(404).send({ status: 'Account Not Found' })
                }
            })
        } else {
            res.status(500).send({ error: true, messages: "Your params not complete" })
        }
    },
    keeplogin: (req, res) => {
        console.log(req.body)
        if (req.body.id) {
            let getSQL = `Select * from users where 
            iduser=${db.escape(req.body.id)};`

            db.query(getSQL, (err, results) => {
                if (err) {
                    res.status(500).send({ status: 'Error Mysql Login', messages: err })
                }
                if (results) {
                    res.status(200).send(results)
                } else {
                    res.status(404).send({ status: 'Account Not Found' })
                }
            })
        } else {
            res.status(500).send({ error: true, messages: "Your params not complete" })
        }
    },
    register: (req, res) => {
        // fungsi register
        let insertSQL = `Insert into users (username,email,password) 
        values (${db.escape(req.body.username)},${db.escape(req.body.email)},${db.escape(req.body.password)});`

        db.query(insertSQL, (err, results) => {
            if (err) {
                res.status(500).send({ status: 'Error Mysql Regis', messages: err })
            }
            res.status(200).send(results)
        })
    }
}