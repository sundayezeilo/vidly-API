const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: 'logfile.log' }),
    new winston.transports.MongoDB({ 
      db: 'mongodb://localhost/vidly',
      level: 'info'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exceptions.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'rejections.log' })
  ],
  exitOnError: false
}); 
