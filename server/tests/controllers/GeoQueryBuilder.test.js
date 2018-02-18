const GeoQueryBuilder = require('../../controllers/GeoQueryBuilder');

//NEAR QUERY TEST
describe('Test near query generation : ', () => {
  test('missing geoJson parameter', () => {
    expect(function(){
      GeoQueryBuilder.buildNearQuery();
    }).toThrow("missing parameters for near query");

    expect(function(){
      GeoQueryBuilder.buildNearQuery(undefined, 1);
    }).toThrow("missing parameters for near query");

    expect(function(){
      GeoQueryBuilder.buildNearQuery([0,0]);
    }).toThrow("missing parameters for near query");
  });

  test('invalid distance', () => {
    expect(function(){
      GeoQueryBuilder.buildNearQuery([0,0], 'test');
    }).toThrow("invalid distance");

    expect(function(){
      GeoQueryBuilder.buildNearQuery([0,0], function(){});
    }).toThrow("invalid distance");

    expect(function(){
      GeoQueryBuilder.buildNearQuery([0,0], -24);
    }).toThrow("invalid distance");
  });

  test('near query creation', () => {
    var expected = {
      geojson: {
        $nearSphere : {
          $geometry: {
            "type": "Point",
            "coordinates": [0, 0]
          },
          $maxDistance : 42
        }
      }
    };

    var built = GeoQueryBuilder.buildNearQuery({"type":"Point","coordinates":[0,0]}, 42);

    expect(JSON.stringify(built)).toMatch(JSON.stringify(expected));
  });
});
//WITHIN QUERY TEST
describe('Test within query generation : ', () => {
  test('missing geojson', () => {
    expect(function(){
      GeoQueryBuilder.buildWithinQuery();
    }).toThrow("missing geoJSON for within query");

    expect(function(){
      GeoQueryBuilder.buildWithinQuery(undefined);
    }).toThrow("missing geoJSON for within query");
  });

  test('within query creation', () => {
    var expected = {
     geojson:
       {
         $geoWithin : {
           $geometry : {
             "type": "Point",
             "coordinates": [0, 0]
           }
         }
       }
    };
    var built = GeoQueryBuilder.buildWithinQuery({"type": "Point","coordinates": [0, 0]});
    expect(JSON.stringify(built)).toMatch(JSON.stringify(expected));
  });
});
//INTERSECT QUERY TEST
describe('Test intersect query generation : ', () => {
  test('missing geojson', () => {
    expect(function(){
      GeoQueryBuilder.buildIntersectQuery();
    }).toThrow("missing geoJSON for intersect query");

    expect(function(){
      GeoQueryBuilder.buildIntersectQuery(undefined);
    }).toThrow("missing geoJSON for intersect query");
  });

  test('intersect query creation', () => {
    var expected = {
     geojson:
       {
         $geoIntersects : {
           $geometry : {
               "type": "Point",
               "coordinates": [0, 0]
            }
         }
       }
    };
    var built = GeoQueryBuilder.buildIntersectQuery({"type": "Point","coordinates": [0, 0]});
    expect(JSON.stringify(built)).toMatch(JSON.stringify(expected));
  });
});
