var DataMapper = require('../../../services/data/DataMapper');
var MockMapper = require('./mapper/mapper.mock');

describe('Data mapper failure handler', () => {

  test('Test unavailable mapper behavior', () => {
    return DataMapper.getInstanceOf('').then((mapper) => {
      expect(mapper.getTargetType()).toMatch("default");
    });
  });

  test('Test bad parameter mapper behavior', () => {
    return DataMapper.getInstanceOf(undefined).then((mapper) => {
        expect(mapper.getTargetType()).toMatch("default");
    });
  });
});

describe('Data mapper succes', () => {

  beforeAll(() => {
    DataMapper.Mappers.Mock = MockMapper;
  });

  test('Get mapper.mock module', () => {
    return DataMapper.getInstanceOf('Mock').then((mapper) => {
        expect(mapper.getTargetType()).toMatch("mock");
    });
  });
});
