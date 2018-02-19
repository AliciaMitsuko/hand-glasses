var FeatureCollection = require('../../../../services/data/mappers/FeatureCollection');

describe('Test FeatureCollection mapper', () => {
  var accidents;

  beforeEach(() => {
    accidents = [{
              "geojson": {
                  "type": "Point",
                  "coordinates": [
                      42,
                      42
                  ]
              },
              "contexte": {
                  "surf": 1,
                  "atm": 1,
                  "lum": 1,
                  "heure": "1645"
              },
              "gravite": 4,
              "_id": "5a858c35b008a74d37a7af9d",
              "num": "201600001910",
              "dep": 440,
              "com": 47,
              "date": "2016-08-03T14:45:00.000Z",
              "good": 0,
              "bad": 0,
              "__v": 0
          },
          {
              "geojson": {
                  "type": "Point",
                  "coordinates": [
                      26,
                      26
                  ]
              },
              "contexte": {
                  "surf": 1,
                  "atm": 1,
                  "lum": 3,
                  "heure": "400"
              },
              "gravite": 3,
              "_id": "5a858bb5b008a74d37a7af5a",
              "num": "201600001843",
              "dep": 440,
              "com": 28,
              "date": "2016-04-21T14:00:00.000Z",
              "good": 0,
              "bad": 0,
              "__v": 0
          }];
  });

  test('Correct data format type', () => {
      expect(FeatureCollection.convertMultiple(accidents).type).toMatch("FeatureCollection");
  });

  test('Correct data format array', () => {
    expect(Array.isArray(FeatureCollection.convertMultiple(accidents).features)).toBe(true);
  });

  test('Test no information loss', () => {
      expect(FeatureCollection.convertMultiple(accidents).features.length).toBe(accidents.length);
  });

  test('Convert one accident', () => {
    var accCoord = accidents[0].geojson;
    var converted = FeatureCollection.convertOne(accidents[0]);

    expect(JSON.stringify(converted.accidentData)).toMatch(JSON.stringify(accidents[0]));
    expect(JSON.stringify(converted.geometry)).toMatch(JSON.stringify(accCoord));
  });

  test('convert an object that is not an array', () => {
      expect(FeatureCollection.convertMultiple(accidents[0]).features.length).toBe(1);
  });
});

describe('Test FeatureCollection error and misuse', () => {
  test('invalid or undefined object as parameter for FeatureCollection multi mapper', () => {
    expect(function(){FeatureCollection.convertMultiple()}).toThrow();
    expect(function(){FeatureCollection.convertMultiple(undefined)}).toThrow();
    expect(function(){FeatureCollection.convertMultiple({type:"bad"})}).toThrow();
  });

  test('invalid or undefined object as parameter for FeatureCollection 1 mapper', () => {
    expect(function(){FeatureCollection.convertOne()}).toThrow();
    expect(function(){FeatureCollection.convertOne(undefined)}).toThrow();
    expect(function(){FeatureCollection.convertOne({type:"bad"})}).toThrow();
  });

});
