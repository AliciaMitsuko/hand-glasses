var AccidentService = require('../services/accidents.service')
var _ = require('lodash');
var fs = require("fs");
var csv = require("fast-csv");
var q = require('q');
_this = this


exports.convertCSVToAccidentLineAsync = async (req, res, next) => {
    function readCSV (index) {
        return new Promise((resolve, reject) => {
            let options = { delimiter: ';', headers: true }
            let bool = true
            let stream = fs.createReadStream('../resources/samples_2016.csv')

            let csvStream = csv(options)
                .on('data', (data) => {
                    if (bool && (index == 1)) {
                        console.log(data.adr)
                        bool = false
                        resolve(data)
                    }
                }).on('end', () => {
                        console.log('end')
                }).on('error', (error) => { reject(error) })

                    stream.pipe(csvStream)
                }
        )
    }

    try {
        readCSV(1).then(
            (accident) => {
            // console.log(accident);
            this.createAccidentFromLine(accident, req, res, next)
        },
            (error) => {
            console.log('error', error)
        })
    .catch(function(e) {
                return res.status(400).json({ status: 400, message: e.message })
            }
        )
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createAccidentFromLine = async function(data, req, res, next) {

    var accident = {
        gravite: data.grav,
        dep: data.dep,
        com: data.com,
        // contexte: new Contexte(data.surf, data.atm, data, lum, data.hrmn),
        // geojson: new GeoJSON(data.lat, data.long),
        heure: data.hrmn, // à mettre dans contexte ?
        date: new Date(data.an, data.mois, data.jour)
    };

    try{
        var createdAccidentFromLine = await AccidentService.createAccident(accident)
        return res.status(201).json({status: 201, data: createdAccidentFromLine, message: "Succesfully Created Accident"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message + ", Accident Creation was Unsuccesfull"})
    }
}

exports.getAccidents = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    console.log(page, limit)

    try{
        var accidents = await AccidentService.getAccidents({}, page, limit)
        return res.status(200).json({status: 200, data: accidents, message: "Succesfully Accidents Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createAccident = async function(req, res, next){
    var accident = {
        gravite: req.body.gravite,
        dep: req.body.dep,
        com: req.body.com,
        date: req.body.date,
    }

    try{
        var createdAccident = await AccidentService.createAccident(accident)
        return res.status(201).json({status: 201, data: createdAccident, message: "Succesfully Created Accident"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Accident Creation was Unsuccesfull"})
    }
}

exports.updateAccident = async function(req, res, next){

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var accident = {
        id,
        title: req.body.title ? req.body.title : null,
        description: req.body.description ? req.body.description : null,
        status: req.body.status ? req.body.status : null
    }

    try{
        var updatedAccident = await AccidentService.updateAccident(accident)
        return res.status(200).json({status: 200, data: updatedAccident, message: "Succesfully Updated Tod"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeAccident = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await AccidentService.deleteAccident(id)
        return res.status(204).json({status:204, message: "Succesfully Accident Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}



exports.convertCSVToAccidentLineAsyncMARCHEPAS = async function(req, res, next) {

    function readCSV(index) {
        var deferred = q.defer();

        // return new Promise(
        setTimeout(function() {
            var options = {delimiter: ';', headers: true};
            var bool = true;
            var stream;
            stream = fs.createReadStream('../resources/samples_2016.csv');

            var csvStream = csv(options)
                .on("data", function(data) {
                    if (bool && (index == 1)) {
                        console.log(data.adr);
                        // this.createAccidentFromLine(data);
                        deferred.resolve(data);
                        bool = false;
                    }
                })
                .on("end", function() {
                    console.log('done');

                });
            stream.pipe(csvStream);
        }, 100);
        return deferred.promise;
        // return new Promise(deferred.resolve, deferred.reject)
    }

    try {
        readCSV(1).then( (accident) => {
            createAccidentFromLine(accident, req, res, next);

    }).catch(function(e) {
            return res.status(400).json({status: 400, message: e.message});
        });
        // return res.status(200).json({status: 200, message: "Succesfully Save in the DB"});

    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}
