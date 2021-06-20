const Joi = require('joi');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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
  passwordChangedAt: {
    type: Date
  }
});


userSchema.methods.generateAuthToken = function() {
  return jwt.sign({
    _id: this._id,
    isAdmin: this.isAdmin,
  }, config.get('jwtPrivateKey'));
}

userSchema.methods.validatePassword = async function(reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
}

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimeStamp < changedTimeStamp;
  }

  return false;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email()
      .required(),
    password: Joi.string().min(6).max(255).required(),
    passwordChangedAt: Joi.date(),
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