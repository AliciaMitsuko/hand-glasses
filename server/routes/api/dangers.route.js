var express = require('express');
var swagger = require('swagger-spec-express');

var router = express.Router();
swagger.swaggerize(router);
var DangerController = require('../../controllers/dangers.controller');


router.post('/within/:format', DangerController.getDangersWithin);
router.post('/crossed/:format', DangerController.getCrossedDangers);

router.get('/', DangerController.getNearbyDangers).describe({
    summary: "Récupère les accidents proche géographiquement",
    description: "Récupère les accidents distant d'au plus n mètres en fonction de la latitude et de la longitude",
    tags: [
      "Dangers"
    ],
    operationId: "Nearby",
    produces:["application/json"],
    parameters:[
    {
      "in":"query",
      "name":"lat",
      "type" : "number",
      "required": true,
      "description":"La latitude désirée"
    },
    {
      "in":"query",
      "name":"long",
      "type" : "number",
      "required": true,
      "description":"La longitude désirée"
    },
    {
      "in":"query",
      "name":"distance",
      "type" : "number",
      "required": true,
      "description":"La distance de recherche voulue en mètres"
    }
],
    responses: {
        200: {
            description: "Return a list of nearby accidents"
        }
    }
});
router.get('/:format', DangerController.getNearbyDangers);
router.post('/', DangerController.getNearbyDangers);
router.post('/:format', DangerController.getNearbyDangers);


module.exports = router;
