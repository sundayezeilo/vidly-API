const { Router } = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const { create, validateReturn } = require('../controllers/returns');

const router = Router();

router.post('/', [auth, validate(validateReturn)], create);

module.exports = router;
