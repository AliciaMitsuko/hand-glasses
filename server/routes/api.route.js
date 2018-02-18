var express = require('express')

var router = express.Router()
var accidents = require('./api/accidents.route')
var dangers = require('./api/dangers.route');

router.use('/accidents', accidents);
router.use('/dangers', dangers);


module.exports = router;
