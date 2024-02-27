const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connection successfully established")
  }).catch((err) => {
    console.log("Connection not established")
  });