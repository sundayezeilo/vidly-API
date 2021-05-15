const { Router } = require('express');

const router = Router();

const {
  show,
  index,
  create,
  update,
  destroy,
} = require('../controllers/customers');

router.get('/', index);

router.get('/:id', show);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', destroy);

module.exports = router;