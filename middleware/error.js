const logger = require('../startup/logging');

/* eslint-disable no-unused-vars */
module.exports = (err, req, res, _next) => { // never remove next from here
  logger.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Something broke';

  res.status(err.statusCode).send(err.status);
};