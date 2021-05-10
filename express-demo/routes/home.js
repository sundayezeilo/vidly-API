const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // res.send('Hello world');
  res.render('index', { title: 'My Express App', message: 'Hello, world!' });
})

module.exports = router;