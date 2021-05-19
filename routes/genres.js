const { Router } = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { validateGenre } = require('../models/genre');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');

const {
  show,
  index,
  create,
  update,
  destroy,
} = require('../controllers/genres');

const router = Router();

router.get('/', index);

router.post('/', [auth, validate(validateGenre)], create);

router.put('/:id', [auth, validateObjectId, validate(validateGenre)], update);

router.delete('/:id', [auth, admin, validateObjectId], destroy);

router.get('/:id', validateObjectId, show);

module.exports = router;