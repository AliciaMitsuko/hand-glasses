var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var AccidentSchema = new mongoose.Schema({
    // geojson: GeoJSON,
    geojson: {
        'type': {
            type: String
        },
        'coordinates': {
            type: [Number, Number]
        }
    },
    contexte: {surf: Number, atm: Number, lum: Number, heure: String},
    gravite: {
        type: Number,
        trim: true,
        default: 1,
    },
    dep: {
        type: Number,
        trim: true,
    },
    com: {
        type: Number,
        trim: true,
    },
    // heure: String,
    date: Date,
    num: {
        type: String,
        unique: true,
        trim: true,
    }
})

AccidentSchema.plugin(mongoosePaginate)
const Accident = mongoose.model('Accident', AccidentSchema)

module.exports = Accident;