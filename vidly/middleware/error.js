const logger = require('../startup/logging');

/* eslint-disable no-unused-vars */
module.exports = (err, req, res, next) => { // never remove next from here
  logger.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send('Something broke!');
};