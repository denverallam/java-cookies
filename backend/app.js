const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')

const errorMiddleware = require('./middlewares/errors')

// Setting up config file
//if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })

app.use(express.json())
app.use(cookieParser())

//Import all routes
const services = require('./routes/service')
const products = require('./routes/product')
const auth = require('./routes/auth')
const audits = require('./routes/audit')
const categories = require('./routes/category')

app.use('/api/v1', services)
app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', audits)
app.use('/api/v1', categories)

/*
if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}
*/
// Middleware to handle errors
app.use(errorMiddleware)

module.exports = app