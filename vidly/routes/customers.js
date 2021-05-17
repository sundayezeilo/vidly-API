const { Router } = require('express');
const validateObjectId = require('../middleware/validateObjectId');

const router = Router();

const {
  show,
  index,
  create,
  update,
  destroy,
} = require('../controllers/customers');

router.get('/', index);

router.get('/:id', validateObjectId, show);

router.post('/', create);

router.put('/:id', validateObjectId, update);

router.delete('/:id', validateObjectId, destroy);

module.exports = router;