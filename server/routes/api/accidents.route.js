var express = require('express')

var router = express.Router()

var AccidentController = require('../../controllers/accidents.controller');

router.get('/', AccidentController.getAccidents)
router.get('/:id', AccidentController.getAccidentsById)
router.get('/gravite', AccidentController.getAccidentsByGravite)
router.post('/', AccidentController.createAccident)
router.put('/', AccidentController.updateAccident)
router.delete('/:id',AccidentController.removeAccident)

router.get('/generate/:id', AccidentController.convertCSVToAccidentLineAsync)

router.get('/all', AccidentController.getAllAccidentsFeatureList);

module.exports = router;
