const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const show = async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.send(_.pick(user, ['name', 'email']));
};

const create = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (user) return res.status(400).send('User already exists!');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  return res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
};

module.exports = { show, create };
