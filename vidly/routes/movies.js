const { Router } = require('express');
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

router.post('/', create);

router.put('/:id', validateObjectId, update);

router.delete('/:id', validateObjectId, destroy);

router.get('/:id', validateObjectId, show);

module.exports = router;