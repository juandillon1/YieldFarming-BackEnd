var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var infoProyectoSchema = new Schema({
    lenguaje: {type: String, required: [true, 'El Lenguaje es requerido']},
    img: {type: String, required: [true, 'La imagen es requerida']},
    descripcion: {type: String, required: [true, 'La descripción es requerida']},
    explicacion: {type: String, required: [true, 'La explicación es requerida']},
    tamanoimg: {
        width: {type: String},
        height: {type: String}
    },
    tamanoiframe: {
        width: {type: String},
        height: {type: String}
    }
});
module.exports = Mongoose.model('infoProyecto', infoProyectoSchema, 'infoProyectos');