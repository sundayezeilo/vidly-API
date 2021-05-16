const morgan = require('morgan');
const express = require('express');
const winston = require('winston');
const logger = require('./startup/logging');

const app = express();

if (app.get('env') === 'development') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));

  logger.stream = {
    write(message) {
      logger.info(message);
    },
  };

  app.use(morgan('tiny', { stream: logger.stream }));
  logger.info('Morgan enabled...');
}

require('./startup/routes')(app);
require('./startup/config')();
require('./startup/db')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;
