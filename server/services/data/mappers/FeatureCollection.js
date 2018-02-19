exports.convertOne = function(accident){
    if(!accident){
      throw new Error('Invalid accident');
    }

    var converted = {};
    converted.type = 'Feature';
    converted.geometry = {};
    converted.geometry.type = accident.geojson.type;
    converted.geometry.coordinates = accident.geojson.coordinates;
    accident.geojson = undefined;
    converted.accidentData = accident;
    return converted;
};

exports.convertMultiple = function(accidents){

  if(!accidents){
    throw new Error('Invalide accident array');
  }

  if(!Array.isArray(accidents)){
    accidents = [accidents];
  }
  try{
    var res = {};
    res.type = "FeatureCollection";
    res.features = [];
    for(var a in accidents){
      res.features.push(this.convertOne(accidents[a]));
    }
    return res;
  }catch(e){
    throw e;
  }
};

exports.getTargetType = function(){
  return "FeatureCollection";
};
