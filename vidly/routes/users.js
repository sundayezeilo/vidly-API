const { Router } = require('express');
const auth = require('../middleware/auth');
const { show, create } = require('../controllers/users');

const router = Router();

router.get('/me', auth, show);

router.post('/', create);

module.exports = router;
