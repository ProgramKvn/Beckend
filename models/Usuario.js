const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//Creando la estructura de la colección
const usuarioSchema = Schema({
    Nombre_Usuario:{
        type: String,
        required: true
    },
    Nombre_Completo: {
        type: String,
        required: true
    },
    Correo_Electrónico: {
        type: String,
        required: true
    },
    Contraseña: {
        type: String,
        required: true
    },
    tokens: [
        {
            token:
            {
                type: String,
                required: true
            }
        }
    ]
});

//El siquiente método encripta la contraseña del usuario
usuarioSchema.pre('save', async function (next) {
    const usuario = this;
    if (usuario.isModified("Contraseña")) {
        usuario.Contraseña = await bcrypt.hash(usuario.Contraseña, 8);
    }
    next();
});

//Método que generará la autenticación para el usuario
usuarioSchema.methods.generateAuthToken = async function () {
    const usuario = this;
    const token = jwt.sign({ _id: usuario._id, Nombre_Usuario: usuario.Nombre_Usuario, Correo_Electrónico: usuario.Correo_Electrónico }, 'secret');
    usuario.tokens = usuario.tokens.concat({ token });
    await usuario.save();
    return token;
}

//Encontrar a un usuario por su Nombre de usuario y contraseña
usuarioSchema.statics.findByCredentials = async (Nombre_Usuario, Contraseña) => {
    const usuario = await Usuario.findOne({ Nombre_Usuario });
    if (!usuario) {
        throw new Error({ error: 'Credenciales erróneas' });
    }
    const ContraseñaVálida = await bcrypt.compare(Contraseña, usuario.Contraseña);
    if (!ContraseñaVálida) {
        throw new Error({ error: 'Credenciales erróneas' });
    }
    return usuario;
};

//Exportando la configuración del esquema
const Usuario = model('Usuario', usuarioSchema);
module.exports = Usuario;