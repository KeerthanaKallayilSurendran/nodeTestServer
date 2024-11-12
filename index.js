require('dotenv').config()

const express = require('express')
const cors = require('cors')

const userServer = express()
const router = require('./Routes/route')
require('./Database/config')
userServer.use(cors())

userServer.use(express.json())
userServer.use(router)

const PORT = 3000 || process.env.PORT

userServer.listen(PORT, () => {
    console.log(`Server Started at Port: ${PORT}`);
})

userServer.get('/', (req, res) => {
    res.status(200).send(`<h1 style='color:red;'>Server is running</h1>`)
})