const {Router} = require('express');
const UserController = require('../controller/UserController');
const authenticated = require('../middleware/authenticated');
const roles = require('../middleware/roles');

const router = Router();

router.post('/create-user', UserController.createUser);

router.use(authenticated);

router.put('/update-user/:id',roles(['adm', 'user']), UserController.updateUser);
router.get('/get-users',roles(['adm']), UserController.getUsers);
router.get('/get-users/:id',roles(['adm']), UserController.getUserById);
router.delete('/delete/:id',roles(['adm']), UserController.deleteById);


module.exports = router;