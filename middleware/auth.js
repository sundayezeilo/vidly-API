const config = require('config');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

module.exports = async (req, res, next) => {
  console.log(req.headers);
  const token = req.headers['authorization'].split(' ')[1];
  if (!token) return res.status(401).send('Access denied. No token provided');
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    const user = await User.findById(decoded._id);
    if(!user) return res.status(401).send('Access denied.');
    req.user = decoded;
  } catch (ex) {
    return res.status(400).send('Invalid token.');
  }
  return next();
};
