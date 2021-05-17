const { Router } = require('express');
const auth = require('../middleware/auth');

const create = require('../controllers/returns');

const router = Router();

router.post('/', [auth], create);

module.exports = router;
