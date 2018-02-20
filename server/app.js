var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// [SH] Require Passport
var passport = require('passport');
var app = express();


var swagger = require('swagger-spec-express');
var packageJson = require('./package.json');


var api = require('./routes/api.route')

var bluebird = require('bluebird')

var fs = require('fs');
var swagger = require('swagger-spec-express');
const swaggerUi = require('swagger-ui-express');



// [SH] Bring in the Passport config after model is defined
require('./config/passport');

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());


var mongoose = require('mongoose');


mongoose.Promise = bluebird;
var DB_PATH = 'mongodb://polytech-admin:Ge8GzZmD7Bw5@ds033966.mlab.com:33966/hand-glasses';

// mongoose.connect('mongodb://127.0.0.1:27017/server', { useMongoClient: true})
// .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/server`)})
// .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/server`)})
app.mongoConnect = function(){
  mongoose.connect(DB_PATH)
  .then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL :` + DB_PATH)})
  .catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL :`+ DB_PATH)})
};

var options = {
   title: packageJson.title,
   description: packageJson.description,
   termsOfService: 'You may only use this api for reasons!',
   contact: {
       name: '',
       url: '',
       email: ''
   },
   license: {
       name: '',
       url: ''
   },
   version: packageJson.version,
   host: 'localhost',
   basePath: '/',
   schemes: ['http'],
   consumes: ['application/json'],
   produces: ['application/json'],
   paths: {
       //manual paths here if desired, not required.
   },
   definitions: {
       //manual definitions here if desired, not required.
   },
   parameters: {
       //manual definitions here if desired, not required.
   },
   responses: {
       //manual responses here if desired, not required.
   },
   tags: [
       {
           name: 'Dangers',
           description: 'Récupération des dangers proche géographiquement',
           externalDocs: {
               description: 'MongoDB GeoQuery doc',
               url: 'https://docs.mongodb.com/manual/reference/operator/query-geospatial/'
           }
       }
   ],
   externalDocs: {
       description: 'This doc describes how to use swagger spec express',
       url: 'https://github.com/eXigentCoder/swagger-spec-express'
   }
};

console.log(JSON.stringify(options));
swagger.initialise(app, options);



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, api_key, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', api);
swagger.compile();


console.log(swaggerUi.serve);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger.json()));

//serv test coverage report
app.use(express.static(__dirname + '/coverage/lcov-report/'));
app.get('/coverage', function(req,res){
    res.sendFile(__dirname + '/coverage/lcov-report/index.html');
});

app.get('/swagger.json', (err, res) => {
    res.status(200).json(swagger.json());
});





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
