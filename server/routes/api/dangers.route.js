var express = require('express');

var router = express.Router();

var DangerController = require('../../controllers/dangers.controller');

router.get('/', DangerController.getNearbyDangers);


router.post('/within', DangerController.getDangersWithin);
router.post('/crossed', DangerController.getCrossedDangers);

module.exports = router;
