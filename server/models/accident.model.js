var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var AccidentSchema = new mongoose.Schema({
    geojson: {
      type: {type: String, default: 'Point'},
      coordinates: {type: [Number], default: [0, 0]}
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

    good: {
        type: Number,
        trim: true,
    },

    bad: {
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

AccidentSchema.virtual('categoryId').get(function() {
    return this._id;
});

AccidentSchema.index({geojson : '2dsphere'});

AccidentSchema.plugin(mongoosePaginate)

const Accident = mongoose.model('Accident', AccidentSchema)

module.exports = Accident;
