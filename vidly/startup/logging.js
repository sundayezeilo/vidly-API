const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/logfile.log' }),
    // new winston.transports.MongoDB({
    //   db: 'mongodb://localhost/vidly',
    //   level: 'info',
    // }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' }),
  ],
  exitOnError: false,
});
