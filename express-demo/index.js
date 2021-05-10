const debug = require('debug')('app:startup');
// const config = require('config');
const Joi = require('joi');
const helmet = require("helmet");
const morgan  = require('morgan');
const express = require('express');
const logger = require('./middleware/logger');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

if(app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

app.use(logger);


const port = process.env.PORT || 5000;
app.listen(port, () => debug(`Listening on port ${port}...`));