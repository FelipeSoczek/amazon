const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dbConnection = require('./database/connection')

dotenv.config()

const app = express()

//Database Connectivity
dbConnection()

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Require API's
const productRoutes = require('./routes/product')
app.use('/api', productRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
