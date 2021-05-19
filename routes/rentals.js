const { Router } = require('express');
const auth = require('../middleware/auth');
const validateObjectId = require('../middleware/validateObjectId');
const {
  show,
  index,
  create,
} = require('../controllers/rentals');

const router = Router();

router.get('/', index);

router.post('/', create);

router.get('/:id', validateObjectId, show);

module.exports = router;