var Accident = require('../models/accident.model');

exports.geoLocateDangers = async function(query, page, limit){
  try{
    var options = {
      page,
      limit
    };
    var near = await Accident.find(query).catch( e => {
      console.log('Accident find err : ' + e);
    });
    return near;
  } catch(err){
    throw Error('error while proximitying');
  }
}
