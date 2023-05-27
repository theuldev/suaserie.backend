const {Router} = require('express');
const RolerController = require('../controller/RoleController')
const router = Router();

router.post('/roles', RolerController.create);
//router.get('/roles');
//router.get('/role/:id');
//router.delete('/role/:id');
//router.put('/role/:id');

module.exports = router;