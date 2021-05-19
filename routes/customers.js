const { Router } = require('express');
const validate = require('../middleware/validate');
const validateObjectId = require('../middleware/validateObjectId');
const {
  validateCustomer,
  validateCustomerUpdate,
} = require('../models/customer');

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

router.post('/', [validate(validateCustomer)], create);

router.put('/:id', [validateObjectId, validate(validateCustomerUpdate)], update);

router.delete('/:id', [validateObjectId], destroy);

module.exports = router;