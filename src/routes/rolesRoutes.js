const {Router} = require('express');
const RolerController = require('../controller/RoleController')
const router = Router();

router.post('/roles', RolerController.create);
router.get('/roles', RolerController.getRoles);

module.exports = router;