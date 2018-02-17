var express = require('express');

var router = express.Router();

var DangerController = require('../../controllers/dangers.controller');

router.get('/', DangerController.getNearbyDangers);

module.exports = router;
