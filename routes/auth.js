const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const { User } = require('../models/user');

const router = express.Router();

function validateUser(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email()
      .required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(req);
}

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();

  return res.send(token);
});

module.exports = router;