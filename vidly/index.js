const debug = require('debug')('app:startup');
const morgan = require('morgan');
const express = require('express');
const logger = require('./startup/logging');
const app = express();

require('./startup/config')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/validation')();


if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
