const { db, dbQuery } = require('../config/database')
const transporter = require('../config/nodemailer')

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
    register: async (req, res, next) => {
        try {
            // Generate OTP
            let karakter = '0123456789abcdefghijklmnopqrstuvwxyz'
            let OTP = ''

            for (let i = 0; i < 6; i++) {
                OTP += karakter.charAt(Math.floor(Math.random() * karakter.length))
            }

            // fungsi register
            let insertSQL = `Insert into users (username,email,password,otp) 
            values (${db.escape(req.body.username)},${db.escape(req.body.email)},${db.escape(req.body.password)},${db.escape(OTP)});`

            insertSQL = await dbQuery(insertSQL)

            let getUser = await dbQuery(`Select * from users where iduser=${insertSQL.insertId}`)
            let { iduser, username, email, role, idstatus, otp } = getUser[0]


            // Membuat token

            // Membuat config email
            //1. Konten email
            let mail = {
                from: 'Admin IKEA <alghifarfn@gmail.com>', //email pengirim, sesuai config nodemailer
                to: email, //email penerima sesuai data Select dari database
                subject: '[IKEA-WEB] Verification Email', //subject email
                html: `<div style="text-align:'center'">
                        <p>Your OTP<b>${otp}</b></p> 
                        <a href='http://localhost:3000/verification'>Verification your email</a>
                </div>` //isi dari email
            }
            // 2. Konfigurasi transporter
            await transporter.sendMail(mail)

            res.status(200).send({ success: true, message: "Register Success ✅" })

        } catch (error) {
            next(error)
        }
    }
}