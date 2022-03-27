const mongoose = require('mongoose');

const logger = require('./logging');
const { config } = require('../config/index');

module.exports = () => {
  const db = config.db;
  mongoose.connect(db,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(`Connected to ${db}...`));
};