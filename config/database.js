const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'AL',
    password: '007@001',
    database: 'dbikea',
    port: 3306,
    multipleStatements: true
})

// db.getConnection((err, connection) => {
//     if (err) {
//         return console.error('error MySQL :', err.message)
//     }
//     console.log(`Connected to MySQL Server : ${connection.threadId}`)
// })

module.exports = { db }