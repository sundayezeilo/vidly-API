const { Router } = require('express');
const {
  show,
  index,
  create,
} = require('../controllers/rentals');

const router = Router();

router.get('/', index);

router.post('/', create);

router.get('/:id', show);

module.exports = router;