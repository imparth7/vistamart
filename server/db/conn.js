const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect("mongodb+srv://imparth:imparth@cluster0.jq3hg8l.mongodb.net/vistamart?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connection successfully established")
  }).catch((err) => {
    console.log("Connection not established")
  });