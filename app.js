const bodyParser = require('body-parser')
const express = require('express')
const dbConnect = require('./config/dbConnect')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
const authRoute = require('./routes/authRoute')
dbConnect()
/*
// const cors = require('cors')
// const morgan = require('morgan')
const shortid = require('shortid')
const fs = require('fs/promises')
const path = require('path')
const dbLocation = path.resolve('.data', 'data.json')

// module scafolding

// middleware
app.use(express.json())
// app.use(cors())
// app.use(morgan('dev'))

// route

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK' })
})
*/

// moduel scafolding
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/user', authRoute)

// listing port
app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`)
  console.log(`localhost:${PORT}`)
})
