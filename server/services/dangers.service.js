var Accident = require('../models/accident.model');

exports.getNearbyDangers = async function(query, page, limit){
  try{
    var options = {
      page,
      limit
    };

    console.log('starting query : ' + JSON.stringify(query));
    var near = await Accident.find(query).catch( e => {
      console.log('Accident find err : ' + e);
    });
    console.log('ending');
    return near;
  } catch(err){
    throw Error('error while proximitying');
  }
}
