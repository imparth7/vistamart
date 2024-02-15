const express = require('express');
const router = express.Router();
const User = require('../models/user')


// Registration path
router.post("/register", async (req, res) => {
  try {
    const newUser = new User(req.body)
    const user = await newUser.save();
    const {password, ...showData} = user

    res.status(201).send({
      message: "Successfully new user registered",
      response: true,
      data: showData
    })
  } catch (err) {
    res.status(400).send(err)
  }
})

// Login path
router.post("/login", async (req, res) => {
  try {
    if (req.body?.email && req.body?.password) {
      const getUser = await User.findOne(req.body).select("-password")
      if (getUser) {
        res.status(200).send({
          message: "User Logged in",
          response: true,
          data: getUser
        })
      } else {
        res.status(200).send({
          message: "User not existed",
          response: null,
        })
      }
    } else {
      res.status(400).send({
        message: "Request not properly sended",
        response: false,
      })
    }
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router