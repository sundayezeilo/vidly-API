const mongoose = require('mongoose');
const logger = require('./logging');

module.exports = function () {
  mongoose.connect('mongodb://localhost/vidly',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info('Connected to MongoDB...'));
};