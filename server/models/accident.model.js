var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var AccidentSchema = new mongoose.Schema({
    // geojson: GeoJSON,
    // contexte: Contexte,
    gravite: String,
    dep: Number,
    com: Number,
    heure: String,
    // gravite: String,
    // dep: String,
    // com: String,
    date: Date
})

AccidentSchema.plugin(mongoosePaginate)
const Accident = mongoose.model('Accident', AccidentSchema)

module.exports = Accident;