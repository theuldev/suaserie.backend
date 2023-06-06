const {Router} = require('express');
const UserController = require('../controller/UserController');
const authenticated = require('../middleware/authenticated');
const roles = require('../middleware/roles');

const router = Router();

router.post('/user/create', UserController.createUser);

router.use(authenticated);

router.put('user/update/:id',roles(['adm']), UserController.updateUser);

router.get('/user/get',roles(['adm']), UserController.getUsers);

router.get('/user/get/:id',roles(['adm']), UserController.getUserById);

router.delete('/user/delete/:id',roles(['adm']), UserController.deleteById);

router.get('/user/info',roles(['user', 'adm']), UserController.infoUser);

router.put('/user/update-me',roles(['adm', 'user']), UserController.updateMe);

router.delete('/user/delete-me',roles(['adm', 'user']), UserController.deleteMe);

router.post('/user/series-fav', roles(['adm', 'user']), UserController.addFavoriteSerie);
router.delete('/user/series-fav/remove/:id', roles(['adm', 'user']), UserController.removeFavoriteSerie);
router.get('/user/series-fav', roles(['adm', 'user']), UserController.getFavoriteSeries);
module.exports = router;