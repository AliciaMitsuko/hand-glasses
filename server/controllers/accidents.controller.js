var AccidentService = require('../services/accidents.service')
var _ = require('lodash');
var fs = require("fs");
var csv = require("fast-csv");
_this = this

exports.convertNameToCodeAsync = async function(req, res, next) {
    try{
        setTimeout(function() {
            var options = {delimiter: ';', headers: true};

            var stream;
            stream = fs.createReadStream('../resources/accidents_2016.csv');

            var csvStream = csv(options)
                .on("data", function(data){
                    console.log(data);
                    // call method post DB
                })
                .on("end", function(){
                    console.log('done');

                });
            stream.pipe(csvStream);
        }, 100);
        return res.status(200).json({status: 200, message: "Succesfully Save in the DB"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
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
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
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