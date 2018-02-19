var Accident = require('../models/accident.model')

_this = this
var Client = require('node-rest-client').Client;

var client = new Client();


exports.getAccidents = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var accidents = await Accident.paginate(query, options)
        return accidents;
    } catch (e) {
        throw Error('Error while Paginating Accidents')
    }
}

exports.getAllAccidents = async function(){
  try{
      var toto={};
    var accidents = await Accident.find(toto).catch(e => {
      console.log('e');
    });
    return accidents;
  } catch(e) {
    throw Error('Error while getting all accidents');
  }
}

exports.getAllAccidentsDep = async function(){
    try{
        var toto={};
        var accident = {
            dep : 1
        }
        var accidents = await Accident.find(toto,accident).catch(e => {
            console.log('e');
        });
        return accidents;
    } catch(e) {
        throw Error('Error while getting all accidents');
    }
}

exports.getAllAccidentsCom = async function(){
    try{
        var toto={};
        var accident = {
            num:1,
            com : 1,
            _id:0,
            dep : 1
        }
        var accidents = await Accident.find(toto,accident).catch(e => {
            console.log('e');
        });
        return accidents;
    } catch(e) {
        throw Error('Error while getting all accidents');
    }
}



exports.getAccidentsByGravite= async function(query, page, limit){
    //var query = { "gravite": 1 };
    var options = {
        page,
        limit
    }
    try {
        var accidents = await Accident.paginate(query, options)
        return accidents;
    } catch (e) {
        throw Error('Error while Paginating Accidents')
    }
}



exports.createAccident = async function(accident){
console.log("call the service")
    console.log(accident);

    var newAccident = new Accident({
        num: accident.num, // can't replace
        gravite: Number(accident.gravite),
        dep: Number(accident.dep),
        com: Number(accident.com),
        adr:accident.adr,
        contexte: accident.contexte,
        geojson: accident.geojson,
        date: accident.date,
        good: accident.good,
        bad: accident.bad
    })
    console.log("[Service] createAccident");

    console.log(newAccident);


    try{
        var savedAccident = await newAccident.save()

        return savedAccident;
    }catch(e){
        throw Error("Error while Creating Accident")
    }
}

exports.updateAccident = async function(accident){
    var id = accident.id

    try{
        var oldAccident = await Accident.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Accident")
    }

    if(!oldAccident){
        return false;
    }


    console.log(oldAccident)

    oldAccident.num = accident.num; // can't replace
    oldAccident.gravite = Number(accident.gravite);
    oldAccident.dep = Number(accident.dep);
    oldAccident.com = Number(accident.com);
    oldAccident.contexte = accident.contexte;
    oldAccident.geojson = accident.geojson;
    oldAccident.date = accident.date;
    oldAccident.good = accident.good;
    oldAccident.bad = accident.bad;

    console.log(oldAccident)

    try{
        var savedAccident = await oldAccident.save()
        return savedAccident;
    }catch(e){
        throw Error("And Error occured while updating the Accident");
    }
}

/**
 * Update field dep of an Accident
 * @param accident
 * @returns {Promise<*>}
 */
exports.updateAccidentFieldDep = async function(accident){
    var id = accident.id;
    var dep = accident.dep;
    try{
        var oldAccident = await Accident.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Accident")
    }

    if(!oldAccident){
        return false;
    }

   // console.log(oldAccident)

    oldAccident.dep = Number(dep);


   // console.log(oldAccident)

    try{
        var savedAccident = await oldAccident.save()
        return savedAccident;
    }catch(e){
        throw Error("And Error occured while updating the Accident");
    }
}


/**
 * Update field com of an Accident
 * We use datanova API to get postalCode from com code
 * @param accident
 * @returns {Promise<boolean>}
 */
exports.updateAccidentFieldCom = async function(accident){
    var id = accident.id;
    var com = accident.com;
    var dep = accident.dep;


    try{
        var oldAccident = await Accident.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Accident")
    }

    if(!oldAccident){
        return false;
    }

    url = "https://datanova.laposte.fr/api/records/1.0/search/?dataset=code-postal-code-insee-2015&q=code_com:"+com+"+AND+code_dept:"+dep;
    console.log("Old Accident"+oldAccident)

    client.get(url, function (data, response) {
        if (response.statusCode == 200) {
            //console.log(data);
            res = JSON.stringify(data);
            res = JSON.parse(res);
            //console.log(res);

            if(typeof res.records[0] !== "undefined") {
                if(typeof res.records[0].fields.code_postal !== "undefined") {
                    console.log("Code postal trouvé : "+res.records[0].fields.code_postal);
                    codePostal = res.records[0].fields.code_postal;

                    oldAccident.com = Number(codePostal);

                    oldAccident.save().then(savedAccident => {
                        console.log("New Accident" + oldAccident)
                        return savedAccident;
                    });
                }
            }


        }
    });

};

exports.deleteAccident = async function(id){

    try{
        var deleted = await Accident.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Accident Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Accident")
    }
}
