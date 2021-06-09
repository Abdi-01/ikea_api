//password 2FA gmail : affziwvmkdruzqhc
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'alghifarfn@gmail.com',
        pass:'affziwvmkdruzqhc'
    },
    tls:{
        rejectUnauthorized:false
    }
})

module.exports = transporter