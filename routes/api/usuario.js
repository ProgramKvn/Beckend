const express = require('express');
const autenticación = require('../../config/autenticación');
const router = express.Router();
const Usuario = require('../../models/Usuario');
const bcrypt = require('bcryptjs');

//La siguiente configuración responderá a la petición POST correspondiente al registro
router.post('/registro', async (req, res) => {
    try {
        /*
        if(EsUsuario >= 1){
            return res.json(409).json({
                message: "El correo electrónico se encuentra en uso";
            });
        }
        */
        const usuario = new Usuario({
            Nombre_Usuario: req.body.Nombre_Usuario,
            Nombre_Completo: req.body.Nombre_Completo,
            Correo_Electrónico: req.body.Correo_Electrónico,
            Contraseña: req.body.Contraseña,
        });
        let Información_Usuario = await usuario.save();
        const token = await usuario.generateAuthToken();
        res.status(201).json({ Información_Usuario, token });
    } catch (err) {
        res.status(400).json({ err: err });
    }
});

//La siguiente configuración responderá a la petición POST correspondiente al inicio de sesión
router.post('/iniciar_sesion', async (req, res) => {
    try {
        const Nombre_Usuario = req.body.Nombre_Usuario;
        const Contraseña = req.body.Contraseña;
        const usuario = await Usuario.findByCredentials(Nombre_Usuario, Contraseña);
        if (!usuario) {
            return res.status(401).json({ error: "Ocurrió un error. Comprueba que las credenciales ingresadas sean las correctas" });
        } else {
            const token = await usuario.generateAuthToken();
            res.status(201).json({ usuario, token });
        }
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

//La siguiente configuración responderá a la petición POST 
router.post('/comprobar_contra/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await Usuario.findById(id);
        const Contraseña = await usuario.Contraseña;
        const AntiguaContra = req.body.AntiguaContra;

        Comprobacion = await bcrypt.compare(AntiguaContra, Contraseña);
        if (!Comprobacion) {
            res.status(299).json(Comprobacion);
        } else {
            res.status(200).json(Comprobacion);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});
//La siguiente configuración responderá a la petición PUT 
router.put('/actualizar_contra/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const NuevaContraseña = await bcrypt.hash(req.body.NuevaContraseña, 8);

        await Usuario.update({ _id: id }, { $set: { Contraseña: NuevaContraseña } });
        res.status(200).json(NuevaContraseña);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//La siguiente configuración responderá a la petición GET - retorna la información del usuario
router.get('/mi_cuenta', autenticación, async (req, res) => {
    await res.json(req.userData);
});

//La siguiente configuración responderá a la petición GET - retorna la información del usuario por ID
router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);
    res.json(usuario);
});

//La siguiente configuración responderá a la petición GET - retorna la información del usuario por Nombre de usuario
router.get('/obtener_usuario/:usuario', async (req, res) => {
    const response = await Usuario.findOne({ Nombre_Usuario: req.params.usuario });
    res.json(response)
});
//La siguiente configuración responderá a la petición PUT - actualiza la información del usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const respuesta = await Usuario.findByIdAndUpdate(id, req.body);
        if (!respuesta) {
            throw new Error('Ocurrió un error en el momento de actualizar el usuario');
        } else {
            const Usuario_Actualizado = { ...respuesta._doc, ...req.body };
            res.status(200).json(Usuario_Actualizado);
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router;