const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email is already registered"],
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address")
      }
    }
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 16
  },
  image: {
    type: String,
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;