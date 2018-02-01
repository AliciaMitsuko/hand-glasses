var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var AccidentSchema = new mongoose.Schema({
    // geojson: GeoJSON,
    contexte: {surf: Number, atm: Number, lum: Number, heure: String},
    gravite: Number,
    dep: Number,
    com: Number,
    heure: String,
    date: Date
})

AccidentSchema.plugin(mongoosePaginate)
const Accident = mongoose.model('Accident', AccidentSchema)

module.exports = Accident;