const { Router } = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
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

router.post('/', auth, create);

router.put('/:id', update);

router.delete('/:id', [auth, admin], destroy);

router.get('/:id', validateObjectId, show);

module.exports = router;