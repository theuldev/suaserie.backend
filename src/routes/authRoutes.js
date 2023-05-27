const {Router} = require('express');
const AuthController = require('../controller/AuthController');

const router = Router();

router.post('/auth/login', AuthController.login);


module.exports = router;