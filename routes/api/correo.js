const { Router } = require('express');
const Correo = require('../../models/Correo');

const router = Router();


//Creando la acción para el verbo POST - Enviar la colección a la base de datos
router.post('/', async (req, res) => {
    const nuevoCorreo = new Correo(req.body);
    try {
        const correo = await nuevoCorreo.save();
        if (!correo) {
            throw new Error('Ocurrió un error en el momento de guardar el correo');
        } else {

            res.status(200).json(correo);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Creando la acción para el verbo GET - Enviar la colección a la base de datos
router.get('/:autor', async (req, res) => {
    const correo = await Correo.find({ Autor: req.params.autor })
    res.status(200).json(correo);
});

//Exportando la configuración de los verbos
module.exports = router;