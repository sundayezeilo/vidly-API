const mongoose = require('mongoose');
const logger = require('./logging');

module.exports = function() {  
  mongoose.connect('mongodb://localhost/vidly',
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => logger.info('Connected to MongoDB...'))
}