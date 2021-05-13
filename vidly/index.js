const debug = require('debug')('app:startup');
const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express');
const logger = require('./middleware/logger');
const genres = require('./routes/genres');
const movies = require('./routes/movies');
const customers = require('./routes/customers');

const app = express();

mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.error('Could not connect to MongoDB'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/movies', movies);
app.use('/api/customers', customers);
app.use(logger);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
