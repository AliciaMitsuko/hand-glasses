var express = require('express')

var router = express.Router()

var AccidentController = require('../../controllers/accidents.controller');
var PreprocessingController = require('../../controllers/PreprocessingData.controller');

router.get('/', AccidentController.getAccidents)
router.get('/preprocessingDep', PreprocessingController.transformRegionCode)
router.get('/preprocessingCom', PreprocessingController.transformComCodeToPostalCode)
router.get('/preprocessingCoords', PreprocessingController.getCoordWithAdress)
router.get('/checkPostCode', PreprocessingController.checkPostCode)

router.get('/id/:id', AccidentController.getAccidentsById)
router.get('/id/:id/:format', AccidentController.getAccidentsById)
router.get('/gravite', AccidentController.getAccidentsByGravite)
router.get('/gravite/:format', AccidentController.getAccidentsByGravite)
router.post('/', AccidentController.createAccident)
router.post('/:format', AccidentController.createAccident)
router.put('/', AccidentController.updateAccident)
router.put('/:format', AccidentController.updateAccident)
router.delete('/:id',AccidentController.removeAccident)

router.get('/vote', AccidentController.getAccidentsByVote);
router.get('/vote/:format', AccidentController.getAccidentsByVote);

router.get('/generate/:id', AccidentController.convertCSVToAccidentLineAsync)

router.get('/all', AccidentController.getAllAccidentsFeatureList);
router.get('/all/:format', AccidentController.getAllAccidentsFeatureList);

router.get('/', AccidentController.getAccidents)
router.get('/:format', AccidentController.getAccidents)

module.exports = router;
