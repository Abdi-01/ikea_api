const express = require('express')
const app = express()
const PORT = 2025
const cors = require('cors')

app.use(cors())

app.use(express.json()) // agar dapat menerima data dari req body url
const { db } = require('./config/database')

db.getConnection((err, connection) => {
    if (err) {
        return console.error('error MySQL :', err.message)
    }
    console.log(`Connected to MySQL Server : ${connection.threadId}`)
})

app.get('/', (req, res) => {
    res.status(200).send('<h2>IKEA API</h2>')
})

const { userRouter, productRouter, transactionRouter } = require('./routers')
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/transaction', transactionRouter)

// error handling
app.use((error, req, res, next) => {
    console.log("Handling error", error)
    res.status(500).send({ status: 'Error Mysql', messages: error })
})

app.listen(PORT, () => console.log('IKEA API Running :', PORT))