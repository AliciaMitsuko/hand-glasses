var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var AccidentSchema = new mongoose.Schema({
    // geojson: GeoJSON,
    // contexte: Contexte,
    gravite: Number,
    dep: Number,
    com: Number,
    date: Date
})

AccidentSchema.plugin(mongoosePaginate)
const Accident = mongoose.model('Accident', AccidentSchema)

module.exports = Accident;