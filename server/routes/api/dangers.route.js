var express = require('express');
var swagger = require('swagger-spec-express');

var router = express.Router();
swagger.swaggerize(router);
var DangerController = require('../../controllers/dangers.controller');


router.post('/within/:format', DangerController.getDangersWithin);
router.post('/crossed/:format', DangerController.getCrossedDangers);

router.get('/', DangerController.getNearbyDangers).describe({
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
