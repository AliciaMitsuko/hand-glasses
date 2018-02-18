exports.buildNearQuery = function(geoJson, distance){

    if(!geoJson || !distance){
      throw "missing parameters for near query";
    }

    if(isNaN(distance) || (distance <= 0)){
      throw "invalid distance";
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
  };

  exports.buildWithinQuery = function(geoJson){
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
  };

  exports.buildIntersectQuery = function(geoJson){
    if(!geoJson){
      throw "missing geoJSON for intersect query";
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
  };
