var DangerService = require('../services/dangers.service');
var GeoQueryBuilder = require('./GeoQueryBuilder');
var DataMapper = require('./../services/data/DataMapper');

exports.getNearbyDangers = async function(req, res, next){
  try{
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 1000;
    var format = req.params.format ? req.params.format : 'default';
    var distance;
    //TODO : add control over query parameters
    if(!req.body.geoJson){
      if(!req.query.long || !req.query.lat){
        return res.status(400).json({status: 400, message: "lat and long needed for geospatial query near"});
      }
      //TODO : add float/coord checker for lat and long
      var geoJson             = {};
      geoJson.type            = "Point";
      geoJson.coordinates     = [parseFloat(req.query.long), parseFloat(req.query.lat)];
      distance = req.query.distance ? req.query.distance : 100;
    }
    else{
      var geoJson = req.body.geoJson;
      distance = req.body.distance ? req.body.distance : 100;
    }
    console.log("body is : " + req.body);
    if(isNaN(distance)){
      return res.status(400).json({status: 400, message: "distance (in meters) must be a number "});
    }
    var query = GeoQueryBuilder.buildNearQuery(geoJson, distance);
    var proximityFrom = await DangerService.geoLocateDangers(query, page, limit);
    var returnData = await DataMapper.getInstanceOf(format).then((mapper) => {
        return mapper.convertMultiple(proximityFrom);
    });

    return res.status(200).json({status: 200, data: returnData});
  }
  catch(err){
    console.log(err);
    return res.status(500).json({status: 500, message: "Problem getting nearby accidents.\nStackTrace : " + JSON.stringify(err)});
  }
};

exports.getDangersWithin = async function(req, res, next){
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  var format = req.params.format ? req.params.format : 'default';
  if(!req.body.geoJson){
    console.log(JSON.stringify(req.body));
    return res.status(400).json({status: 400, message: "geoJSON needed in request body for Within geo spatial request"});
  }
  var geoJson = req.body.geoJson;
  var query = GeoQueryBuilder.buildWithinQuery(geoJson);
  try{
    var withinAccidents = await DangerService.geoLocateDangers(query, page, limit);
    var returnData = await DataMapper.getInstanceOf(format).then((mapper) => {
        return mapper.convertMultiple(withinAccidents);
    });
    return res.status(200).json({status: 200, data: returnData});
  }
  catch(err){
    return res.status(500).json({status: 500, message: "Problem getting accidents within.\nStackTrace : " + JSON.stringify(err)});
  }
};

exports.getCrossedDangers = async function(req, res, next){
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 1000;
  var format = req.params.format ? req.params.format : 'default';
  if(!req.body.geoJson){
    return res.status(400).json({status: 400, message: "geoJSON needed in request body for intersect geo spatial request"});
  }
  var geoJson = req.body.geoJson;
  var query = GeoQueryBuilder.buildIntersectQuery(geoJson);
  try{
    var intersectAccidents = await DangerService.geoLocateDangers(query, page, limit);
    var returnData = await DataMapper.getInstanceOf(format).then((mapper) => {
        return mapper.convertMultiple(intersectAccidents);
    });
    return res.status(200).json({status: 200, data: returnData});
  }
  catch(err){
    return res.status(500).json({status: 500, message: "Problem getting intersected accidents.\nStackTrace : " + JSON.stringify(err)});
  }
};
