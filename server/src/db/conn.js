const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/vistamart")
  .then(() => {
    console.log("Connection successfully established")
  }).catch((err) => {
    console.log("Connection not established")
  });