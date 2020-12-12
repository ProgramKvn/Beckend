const { Schema, model } = require('mongoose');

const cursoSchema = new Schema({
    NombreCurso: {
        type: String
    },
    DescripciónCurso: {
        type: String
    },
    Logo: {
        type: String
    },
    Color: {
        type: String
    },
    Tema: {
        type: String
    },
    DescripciónTema: {
        type: String
    },
    Contenido: {
        type: String
    },
    Fecha: {
        type: Date,
        default: Date.now()
    }
});

const Curso = model("curso", cursoSchema);
module.exports = Curso;
