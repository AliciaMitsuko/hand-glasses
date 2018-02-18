exports.AccidentsTransformer = class AccidentsTransformer {

  convertOneAccident(accident){
    var converted = {};
    converted.type = 'Feature';
    converted.geometry = {};
    converted.geometry.type = accident.geojson.type;
    converted.geometry.coordinates = accident.geojson.coordinates;
    accident.geojson = undefined;
    converted.accidentData = accident;
    return converted;
  }

  convertMultipleAccident(accidents){
    try{
      var res = {};
      res.type = "FeatureCollection";
      res.features = [];
      for(var a in accidents){
        res.features.push(this.convertOneAccident(accidents[a]));
      }
      return res;
    }catch(e){
      throw e;
    }
  }
}
