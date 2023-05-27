const {Router} = require('express')
const UserController = require('../controller/UserController')
const authenticated = require('../middleware/authenticated');
const router = Router();

router.post('/create-user', UserController.createUser);

router.use(authenticated);

router.put('/update-user/:id', UserController.updateUser);
router.get('/get-users', UserController.getUsers);
router.get('/get-users/:id', UserController.getUserById);
router.delete('/delete/:id', UserController.deleteById);


module.exports = router;