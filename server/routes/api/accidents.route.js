var express = require('express')

var router = express.Router()

var AccidentController = require('../../controllers/accidents.controller');

router.get('/', AccidentController.getAccidents)
router.get('/:format', AccidentController.getAccidents)
router.get('/id/:id', AccidentController.getAccidentsById)
router.get('/id/:id/:format', AccidentController.getAccidentsById)
router.get('/gravite', AccidentController.getAccidentsByGravite)
router.get('/gravite/:format', AccidentController.getAccidentsByGravite)
router.post('/', AccidentController.createAccident)
router.post('/:format', AccidentController.createAccident)
router.put('/', AccidentController.updateAccident)
router.put('/:format', AccidentController.updateAccident)
router.delete('/:id',AccidentController.removeAccident)

router.get('/generate/:id', AccidentController.convertCSVToAccidentLineAsync)

router.get('/all', AccidentController.getAllAccidentsFeatureList);
router.get('/all/:format', AccidentController.getAllAccidentsFeatureList);

module.exports = router;
