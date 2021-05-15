const debug = require('debug')('app:startup');
const morgan = require('morgan');
const express = require('express');
const logger = require('./startup/logging');
const app = express();


if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  logger.info('Morgan enabled...');
}

require('./startup/routes')(app);
require('./startup/config')();
require('./startup/db')();
require('./startup/logging');
require('./startup/validation')();


const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
