const {Router} = require('express');
const SerieController = require('../controller/SerieController');
const router = Router();

router.post('/series', SerieController.create);
router.post('/series-fav', SerieController.getSeriesFavorites);
router.get('/series', SerieController.getAll)
router.put('/series/update/:id', SerieController.update)
router.get('/series/:id', SerieController.getById)
router.delete('/series/:id', SerieController.deleteById)

module.exports = router;