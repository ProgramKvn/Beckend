const express = require('express');
const router = express.Router();
const Curso = require('../../models/Crear_Curso.js');

router.get("/", async (req, res) => {
    try {
        const curso = await Curso.find();
        if (!curso) throw Error("Sin cursos");
        res.status(200).json(curso);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await Curso.findById(id);
        res.status(200).json(curso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const curso = new Curso(req.body);
    try {
        const nuevo_curso = await curso.save();
        if (!nuevo_curso) throw Error("UPS! ALGO PASÓ AL GUARDAR EL Curso");
        res.status(200).json(nuevo_curso);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
});

//Exportando la configuración de los verbos
module.exports = router;