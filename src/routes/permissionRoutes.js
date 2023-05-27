const{Router} = require('express');
const PermissionController = require('../controller/PermissionController')
const router = Router();

router.post('/permission', PermissionController.create);


module.exports = router;