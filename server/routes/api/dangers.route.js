var express = require('express');

var router = express.Router();

var DangerController = require('../../controllers/dangers.controller');

router.get('/', DangerController.getNearbyDangers);
router.get('/:format', DangerController.getNearbyDangers);
router.post('/', DangerController.getNearbyDangers);
router.post('/:format', DangerController.getNearbyDangers);

router.post('/within/:format', DangerController.getDangersWithin);
router.post('/crossed/:format', DangerController.getCrossedDangers);

module.exports = router;
