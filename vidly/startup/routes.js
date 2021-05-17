const express = require('express');
const auth = require('../routes/auth');
const users = require('../routes/users');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const customers = require('../routes/customers');
const returns = require('../routes/returns');
const error = require('../middleware/error');

module.exports = (app) => {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/movies', movies);
  app.use('/api/users', users);
  app.use('/api/rentals', rentals);
  app.use('/api/returns', returns);
  app.use('/api/customers', customers);
  app.use('/api/auth', auth);
  app.use(error);
};