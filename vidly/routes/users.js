const _ = require('lodash');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const auth = require('../middleware/auth');
const { User, validate } = require('../models/user');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(_.pick(user, [ 'name', 'email' ]));
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user =  await User.findOne({ email: req.body.email });

  if(user) return res.status(400).send('User already exists!');

  user = new User(_.pick(req.body, [ 'name', 'email', 'password' ]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, [ 'name', 'email' ]));
});

module.exports = router;