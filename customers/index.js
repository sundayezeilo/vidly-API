const express = require('express');
const mongoose = require('mongoose');
const customers = require('./customers');
const app = express();

mongoose.connect('mongodb://localhost/customers', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.error('Could not connect to MongoDB'));


  app.use(express.json());
  app.use('/api/customers', customers);
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));
  
  