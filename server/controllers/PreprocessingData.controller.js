var AccidentService = require('../services/accidents.service')
_this = this;


/**
 * Change forma dep in database
 * divide all by 10 to have format with 2 digit
 * If the dep have already two 2 digit we must add leading 0 in front of the only number
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|JSON|Promise<any>>}
 */
exports.transformRegionCode = async function(req, res, next){
    try{
        //Get all accidents with just the field dep and id
        var accidents = await AccidentService.getAllAccidentsDep();

        for (var i=0; i < accidents.length; i++) {
            //console.log(accidents[i]);
            resp=JSON.stringify(accidents[i]);
            JsonObject = JSON.parse(resp);

            //We divide only if the dep have two or three digit
            if(JsonObject.dep.toString().length==3 || JsonObject.dep.toString().length==2) {
                updateDep={
                    dep:test.dep/10,
                    id:test._id
                };

                //We update accident
                toto=await  AccidentService.updateAccidentFieldDep(updateDep);

            }
        }
        return res.status(200).json({status: 200, data: accidents});
    }catch(e){
        return res.status(500).json({status: 500, message: console.log(e)});
    }
};


/**
 * Transform com code to classic postalCode to interpret adress by an API
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|JSON|Promise<any>>}
 */
exports.transformComCodeToPostalCode = async function(req, res, next){
    try{
        var accidents = await AccidentService.getAllAccidentsCom();

        for (var i=0; i < accidents.length; i++) {
            resp=JSON.stringify(accidents[i]);
            jsonobject = JSON.parse(resp);
            console.log(jsonobject);

            updateDep={
                id:jsonobject._id,
                dep:jsonobject.dep,
                com:jsonobject.com
            };

            newAccident = await AccidentService.updateAccidentFieldCom(updateDep);
            console.log("New accident Controller :"+newAccident);
        }
        return res.status(200).json({status: 200, data: accidents});
    }catch(e){
        return res.status(500).json({status: 500, message: console.log(e)});
    }
};

/**
 * TMP Method
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*|JSON|Promise<any>>}
 */
exports.checkPostCode = async function(req, res, next){
    try{
        var accidents = await AccidentService.getAllAccidentsCom();
        var j=0;
        for (var i=0; i < accidents.length; i++) {
            resp=JSON.stringify(accidents[i]);
            jsonobject = JSON.parse(resp);
            //console.log(jsonobject);

            updateDep={
                id:jsonobject._id,
                dep:jsonobject.dep,
                com:jsonobject.com
            };


            if(jsonobject.com.toString().length<5) {

                j++;
                //toto= await AccidentService.updateAccidentFieldCom(updateDep);
                //console.log("New accident Controller :"+toto);
            }


           // toto= await AccidentService.updateAccidentFieldCom(updateDep);
           // console.log("New accident Controller :"+toto);
        }
        console.log(j);
        return res.status(200).json({status: 200, data: accidents});
    }catch(e){
        return res.status(500).json({status: 500, message: console.log(e)});
    }
};
