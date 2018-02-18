var DangerService = require('../services/dangers.service');
var QueryBuilder = require('./GeoQueryBuilder');

exports.getNearbyDangers = async function(req, res, next){
  console.log('we are somewhere in');
  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 1000;

  console.log('Got query : ' + JSON.stringify(req.query));

  //TODO : add control over query parameters
  var geoJson             = {};
  geoJson.type            = "Point";
  geoJson.coordinates     = [parseFloat(req.query.long), parseFloat(req.query.lat)];

  var query = (new QueryBuilder.GeoQueryBuilder()).buildNearQuery(geoJson, req.query.distance);

  console.log("Query built");

  try{
    var proximityFrom = await DangerService.geoLocateDangers(query, page, limit);
    return res.status(200).json({status: 200, data: proximityFrom});
  }
  catch(err){
    return res.status(404).json({status: 404, message: "Problem getting nearby accidents.\nStackTrace : " + err.message});
  }
};

exports.getDangersWithin = async function(req, res, next){
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  if(!req.body.geoJson){
    console.log(JSON.stringify(req.body));
    return res.status(404).json({status: 404, message: "geoJSON needed in request body for Within geo spatial request"});
  }

  var geoJson = req.body.geoJson;
  var query = (new QueryBuilder.GeoQueryBuilder()).buildWithinQuery(geoJson);

  try{
    var withinAccidents = await DangerService.geoLocateDangers(query, page, limit);
    return res.status(200).json({status: 200, data: withinAccidents});
  }
  catch(err){
    return res.status(404).json({status: 404, message: "Problem getting accidents within.\nStackTrace : " + err.message});
  }
};

exports.getCrossedDangers = async function(req, res, next){
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;

  console.log(JSON.stringify(req.body));

  if(!req.body.geoJson){
    return res.status(404).json({status: 404, message: "geoJSON needed in request body for intersect geo spatial request"});
  }

  console.log('before var geoJson');
  var geoJson = req.body.geoJson;
  console.log('var geoJson is : ' + JSON.stringify(geoJson));
  var query = (new QueryBuilder.GeoQueryBuilder()).buildIntersectQuery(geoJson);
  console.log('query is : ' + query);

  try{
    var intersectAccidents = await DangerService.geoLocateDangers(query, page, limit);
    return res.status(200).json({status: 200, data: intersectAccidents});
  }
  catch(err){
    return res.status(404).json({status: 404, message: "Problem getting intersected accidents.\nStackTrace : " + err.message});
  }
};
