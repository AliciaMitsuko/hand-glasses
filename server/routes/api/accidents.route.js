var express = require('express')

var router = express.Router()

var AccidentController = require('../../controllers/accidents.controller');

router.get('/', AccidentController.getAccidents)
router.post('/', AccidentController.createAccident)
router.put('/', AccidentController.updateAccident)
router.delete('/:id',AccidentController.removeAccident)

router.get('/generate', AccidentController.convertCSVToAccidentLineAsync)

module.exports = router;