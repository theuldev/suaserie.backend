const{Router} = require('express')
const SecurityController = require('../controller/SecurityController');
const router = Router();

router.post('/security/acl', SecurityController.createACL);

module.exports = router;