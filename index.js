const express = require('express')
const app = express()
const PORT = 2025

app.get('/', (req, res) => {
    res.status(200).send('<h2>IKEA API</h2>')
})

app.listen(PORT, () => console.log('IKEA API Running :', PORT))