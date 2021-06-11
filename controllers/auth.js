const Joi = require('joi');
const { User, validateLogin } = require('../models/user');

const login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });

  if (!(user && await user.validatePassword(req.body.password)))
    return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();

  return res.send(token);
};

module.exports = login;