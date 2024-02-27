const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()

// MongoDB Connection
require('./db/conn')

// Port
const PORT = process.env.PORT

// This is convert post json data to stringify data
app.use(express.json())

// This is resolve cors error of client-side
app.use(cors({
  origin: ["https://vistamart.vercel.app"],
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  credentials: true,
}))

// UserRouter
const UserRouter = require('./routers/user')
app.use(UserRouter);
const ProductRouter = require('./routers/product')
app.use(ProductRouter);

// Root path
app.get("/", (req, res) => {
  res.send("Hello World!");
})

app.get("/king", (req, res) => {
  res.send("<h1>King is here</h1>");
})

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})