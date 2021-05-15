const { Router } = require('express');

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

router.put('/:id', update);

router.delete('/:id', destroy);

router.get('/:id', show);

module.exports = router;