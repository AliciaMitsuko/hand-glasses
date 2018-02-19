var Mappers = require('./mappers');

exports.Mappers = Mappers;

exports.getInstanceOf = function(mapper){
  return new Promise((resolve, reject) => {
    try{
      var mapperInstance = Mappers[mapper];
      //TODO: make this work
      /*if(typeOf(mapperInstance.convertOne) == "function" && typeOf(mapperInstance.convertMultiple)  == "function" && typeOf(mapperInstance.getTargetType)  == "function" ){
        console.log('in test');
        resolve(mapperInstance);
      }else{
        console.log('incorrect module');
        resolve(new DefaultMapper());
      }*/
      if(mapperInstance){
        resolve(mapperInstance);
      }else{
        resolve(new DefaultMapper());
      }
    }catch(e){
      resolve(new DefaultMapper());
    }
  });
};

class DefaultMapper{
  convertOne(object){
    return object;
  };

  convertMultiple(object){
    return object;
  };

  getTargetType(){
    return 'default';
  }
}
