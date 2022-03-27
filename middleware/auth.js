const jwt = require('jsonwebtoken');

const { config } = require('../config/index');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided');
  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    req.user = decoded;
  } catch (ex) {
    return res.status(400).send('Invalid token.');
  }
  return next();
};
