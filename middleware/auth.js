const config = require('config');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided');
  try {
    const decoded = await promisify(jwt.verify)(
      token,
      config.get('jwtPrivateKey')
    );

    req.user = decoded;
  } catch (ex) {
    return res.status(400).send('Invalid token.');
  }
  return next();
};
