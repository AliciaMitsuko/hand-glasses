var Accident = require('../models/accident.model')

_this = this


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
        contexte: accident.contexte,
        // geojson: new GeoJSON(accident.lat, accident.long),
        geojson: accident.geojson,
        heure: accident.heure, // à mettre dans contexte ?
        date: accident.date
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

    oldAccident.title = accident.title
    oldAccident.description = accident.description
    oldAccident.status = accident.status


    console.log(oldAccident)

    try{
        var savedAccident = await oldAccident.save()
        return savedAccident;
    }catch(e){
        throw Error("And Error occured while updating the Accident");
    }
}

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