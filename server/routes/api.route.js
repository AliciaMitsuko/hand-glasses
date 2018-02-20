var express = require('express')

var router = express.Router()
var accidents = require('./api/accidents.route');
var dangers = require('./api/dangers.route');
var authentification = require('./api/authentification.route');

router.use('/accidents', accidents);
router.use('/dangers', dangers);
router.use('/authentification', authentification);


module.exports = router;
