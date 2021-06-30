const { Router } = require('express');
const validate = require('../middleware/validate');
const { validateMovie } = require('../models/movie');
const validateObjectId = require('../middleware/validateObjectId');

const {
  show,
  index,
  create,
  update,
  destroy,
} = require('../controllers/movies');

const router = Router();

router.get('/', index);

router.post('/', validate(validateMovie), create);

router.put('/:id', [validateObjectId, validate(validateMovie)], update);

router.delete('/:id', validateObjectId, destroy);

router.get('/:id', validateObjectId, show);

module.exports = router;
