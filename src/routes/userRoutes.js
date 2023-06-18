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

router.put('/user/change-password',roles(['adm', 'user']), UserController.changePassword);

router.delete('/user/delete-me',roles(['adm', 'user']), UserController.deleteMe);

router.post('/user/series-fav', roles(['adm', 'user']), UserController.addFavoriteSerie);

router.delete('/user/series-fav/remove/:id', roles(['adm', 'user']), UserController.removeFavoriteSerie);

router.get('/user/series-fav', roles(['adm', 'user']), UserController.getFavoriteSeries);

router.post('/user/series-watched/:id', roles(['adm', 'user']), UserController.addWatchedSerie);

router.get('/user/series-watched', roles(['adm', 'user']), UserController.getWatchedSeries);

router.delete('/user/series-watched/remove/:id', roles(['adm', 'user']), UserController.removeWatchedSerie);

router.post('/user/series-disliked/:id', roles(['adm', 'user']), UserController.addDislikedSerie);

router.get('/user/series-disliked', roles(['adm', 'user']), UserController.getDislikedSeries);

router.delete('/user/series-disliked/remove/:id', roles(['adm', 'user']), UserController.removeDislikedSerie);

router.post('/user/series-desired/:id', roles(['adm', 'user']), UserController.addDesiredSerie);

router.get('/user/series-desired', roles(['adm', 'user']), UserController.getDesiredSeries);

router.delete('/user/series-desired/remove/:id', roles(['adm', 'user']), UserController.removeDesiredSerie);

router.post('/user/rating', roles(['adm', 'user']), UserController.makeRating);

router.get('/user/rating/:serieId', roles(['adm', 'user']), UserController.getRating);

router.post('/user/create-streaming', roles(['adm', 'user']), UserController.createStreaming);


module.exports = router;