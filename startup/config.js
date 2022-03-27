const { config } = require('../config/index');

module.exports = () => {
  if (!config.jwtPrivateKey) {
    throw new Error('FATAl ERROR: jwtPrivateKey is not defined');
  }
};