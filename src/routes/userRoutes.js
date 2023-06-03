const {Router} = require('express');
const UserController = require('../controller/UserController');
const authenticated = require('../middleware/authenticated');
const roles = require('../middleware/roles');

const router = Router();

router.post('/create-user', UserController.createUser);

router.use(authenticated);

router.put('/update-user/:id',roles(['adm']), UserController.updateUser);

router.get('/get-users',roles(['adm']), UserController.getUsers);

router.get('/get-users/:id',roles(['adm']), UserController.getUserById);

router.delete('/delete/:id',roles(['adm']), UserController.deleteById);

router.get('/info-user',roles(['user', 'adm']), UserController.infoUser);

router.put('/update-me',roles(['adm', 'user']), UserController.updateMe);

router.delete('/delete-me',roles(['adm', 'user']), UserController.deleteMe);
module.exports = router;