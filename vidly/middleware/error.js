const logger = require('../startup/logging');

module.exports = function(err, req, res, next){
  logger.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug 
  // silly

  res.status(500).send('Something broke!');
}