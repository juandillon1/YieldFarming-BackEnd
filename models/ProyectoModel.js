var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var ProyectoSchema = new Schema({
    nombre: {type: String, required: [true, 'El Nombre es requerido']},
    img: {type: String, required: false},
    url: {type: String, required: [true, 'El URL es requerido']},
    token: {type: Array, required: [true, 'El URL es requerido']},
    descripcion: {type: String, required: [true, 'La descripcion es requerida']},
    tipo: {type: String, required: [true, 'El tipo es requerido']},
    porcentaje: {type: String, required: [true, 'El porcentaje es requerido']},
});
module.exports = Mongoose.model('Proyecto', ProyectoSchema, 'proyectos');