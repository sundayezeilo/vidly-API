const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { config } = require('../config/index');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

function genToken() {
  return jwt.sign({
    _id: this._id,
    isAdmin: this.isAdmin,
  }, config.jwtPrivateKey);
}

async function validatePassword(reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
}

userSchema.methods.generateAuthToken = genToken;
userSchema.methods.validatePassword = validatePassword;

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email()
      .required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(user);
}


function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email()
      .required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = { User, validateUser, validateLogin };