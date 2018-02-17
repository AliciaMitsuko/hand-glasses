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
    var proximityFrom = await DangerService.getNearbyDangers(query, page, limit);
    return res.status(200).json({status: 200, data: proximityFrom});
  }
  catch(err){
    return res.status(404).json({status: 404, message: e.message + " problem computing proximity"});
  }
};
