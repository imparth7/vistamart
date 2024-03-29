const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()

// MongoDB Connection
require('./db/conn')

// Port
const PORT = process.env.PORT | 8000

// This is convert post json data to stringify data
app.use(express.json())

// This is resolve cors error of client-side
app.use(cors())

// UserRouter
const UserRouter = require('./routers/user')
app.use(UserRouter);
const ProductRouter = require('./routers/product')
app.use(ProductRouter);

// Root path
app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})