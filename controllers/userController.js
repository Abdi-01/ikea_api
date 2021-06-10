const { db, dbQuery, transporter, createToken } = require('../config')
const Crypto = require('crypto');

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
            let hashPassword = Crypto.createHmac("sha256", "ikea$$$").update(req.body.password).digest("hex")
            let getSQL = `Select * from users where 
            email=${db.escape(req.body.email)} and password=${db.escape(hashPassword)};`

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

            // hashingPassword
            let hashPassword = Crypto.createHmac("sha256", "ikea$$$").update(req.body.password).digest("hex")

            // fungsi register
            let insertSQL = `Insert into users (username,email,password,otp) 
            values (${db.escape(req.body.username)},${db.escape(req.body.email)},${db.escape(hashPassword)},${db.escape(OTP)});`

            insertSQL = await dbQuery(insertSQL)

            let getUser = await dbQuery(`Select * from users where iduser=${insertSQL.insertId}`)
            let { iduser, username, email, role, idstatus, otp } = getUser[0]


            // Membuat token
            let token = createToken({ iduser, username, email, role, idstatus })

            // Membuat config email
            //1. Konten email
            let mail = {
                from: 'Admin IKEA <alghifarfn@gmail.com>', //email pengirim, sesuai config nodemailer
                to: email, //email penerima sesuai data Select dari database
                subject: '[IKEA-WEB] Verification Email', //subject email
                html: `<div style="text-align:'center'">
                        <p>Your OTP<b>${otp}</b></p> 
                        <a href='http://localhost:3000/verification/${token}'>Verification your email</a>
                </div>` //isi dari email
            }
            // 2. Konfigurasi transporter
            await transporter.sendMail(mail)

            res.status(200).send({ success: true, message: "Register Success ✅" })

        } catch (error) {
            next(error)
        }
    },
    verification: async (req, res, next) => {
        try {
            console.log("Hasil readToken :", req.user)
            let sqlUpdate = `Update users set idstatus = 11 where iduser=${req.user.iduser} and otp=${db.escape(req.body.otp)};`
            sqlUpdate = await dbQuery(sqlUpdate)
            res.status(200).send({ success: true, message: "Verification Success ✅" })
        } catch (error) {
            next(error)
        }
    },
    reVerification: async (req, res, next) => {
        try {
            let hashPassword = Crypto.createHmac("sha256", "ikea$$$").update(req.body.password).digest("hex")
            let getUser = await dbQuery(`Select * from users where email=${db.escape(req.body.email)} and password=${db.escape(hashPassword)};`)
            
            let { iduser, username, email, role, idstatus } = getUser[0]
            
            // Generate OTP
            let karakter = '0123456789abcdefghijklmnopqrstuvwxyz'
            let OTP = ''
            
            for (let i = 0; i < 6; i++) {
                OTP += karakter.charAt(Math.floor(Math.random() * karakter.length))
            }
            
            // Update otp
            await dbQuery(`Update users set otp=${db.escape(OTP)} where iduser=${iduser};`)
            
            // Membuat token
            let token = createToken({ iduser, username, email, role, idstatus })
            
            // Membuat config email
            //1. Konten email
            let mail = {
                from: 'Admin IKEA <alghifarfn@gmail.com>', //email pengirim, sesuai config nodemailer
                to: email, //email penerima sesuai data Select dari database
                subject: '[IKEA-WEB] Re-Verification Email', //subject email
                html: `<div style="text-align:'center'">
                <p>Hello ${username}, NEW OTP<b>${OTP}</b></p> 
                <a href='http://localhost:3000/verification/${token}'>Re-Verification your email</a>
                </div>` //isi dari email
            }
            // 2. Konfigurasi transporter
            await transporter.sendMail(mail)
            
            res.status(200).send({ success: true, message: "Re-Verification Success ✅, Check your Email" })
        } catch (error) {
            next(error)
        }
    }
}