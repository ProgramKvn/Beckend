const { Schema, model } = require('mongoose');

const correoSchema = new Schema({
    Asunto: {
        type: String
    },
    Contenido: {
        type: String
    },
    Autor: {
        type: String
    },
    Correo_Autor:{ 
        type: String
    },
    Nombre_Completo:{
        type: String
    },
    Fecha: {
        type: Date,
        default: Date.now()
    }
});

//Creando un modelo de datos para poder exportarlo
const Correo = model('correo', correoSchema);
module.exports = Correo;