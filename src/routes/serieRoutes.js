const {Router} = require('express');
const SerieController = require('../controller/SerieController');
const router = Router();

router.post('/series', SerieController.create);


module.exports = router;