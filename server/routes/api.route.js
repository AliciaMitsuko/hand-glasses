var express = require('express')

var router = express.Router()
var todos = require('./api/todos.route')
var accidents = require('./api/accidents.route')


router.use('/todos', todos);
router.use('/accidents', accidents);


module.exports = router;