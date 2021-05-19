const { Router } = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { validateUser } = require('../models/user');
const { show, create } = require('../controllers/users');

const router = Router();

router.get('/me', auth, show);

router.post('/', validate(validateUser), create);

module.exports = router;
