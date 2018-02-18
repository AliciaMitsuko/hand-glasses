exports.GeoQueryBuilder = class GeoQueryBuilder {

  buildNearQuery(geoJson, distance){

    if(!geoJson || !distance){
      throw "missing parameters for near query";
    }

    if(isNaN(distance)){
      throw "distance is not a number";
    }

    var query = {
     geojson:
       {
         $nearSphere : {
            $geometry: geoJson,
            $maxDistance: distance
          }
       }
    };
    return query;
  }

  buildWithinQuery(geoJson){
    if(!geoJson){
      throw "missing geoJSON for within query";
    }

    var query = {
     geojson:
       {
         $geoWithin : {
            $geometry: geoJson
          }
       }
    };
    return query;
  }

  buildIntersectQuery(geoJson){
    if(!geoJson){
      throw "missing geoJSON for within query";
    }

    var query = {
     geojson:
       {
         $geoIntersects : {
            $geometry: geoJson
          }
       }
    };
    return query;
  }

};
