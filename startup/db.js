const config = require('config');
const mongoose = require('mongoose');
const logger = require('./logging');

module.exports = () => {
  const db = config.get('db');
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(`Connected to ${db}...`));
};
