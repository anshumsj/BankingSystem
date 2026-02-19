const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
// allwoing our frotend to access our backend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser())
const authrouter = require('./routes/auth.routes')
const accountrouter = require('./routes/account.routes') 
const transactionrouter = require('./routes/transaction.routes')

app.use(express.json())

app.use('/api/auth',authrouter)
app.use('/api/accounts',accountrouter)
app.use('/api/transactions',transactionrouter)

module.exports = app