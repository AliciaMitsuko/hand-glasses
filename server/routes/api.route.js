var express = require('express')

var router = express.Router()
var todos = require('./api/todos.route')
var accidents = require('./api/accidents.route')
var dangers = require('./api/dangers.route');


router.use('/todos', todos);
router.use('/accidents', accidents);
router.use('/dangers', dangers);


module.exports = router;
