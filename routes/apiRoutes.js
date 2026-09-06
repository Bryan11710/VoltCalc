const express = require('express');
const router = express.Router();

const { Usuario, Calculo } = require('../models'); 

// RUTA OPTIMIZADA: Eager Loading + Selección de campos para App Móvil
router.get('/optimized', async (req, res) => {
    try {
        const data = await Usuario.findAll({
            
            attributes: ['id', 'nombre'], 
            include: [{
                model: Calculo,
                
                attributes: ['id', 'resultado'] 
            }]
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/inefficient', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        const resultado = [];
        
        for (const usuario of usuarios) {
            const calculos = await Calculo.findAll({ where: { usuarioId: usuario.id } });
            resultado.push({
                ...usuario.toJSON(),
                calculos
            });
        }
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/seed', async (req, res) => {
    try {
        const usuario = await Usuario.create({ nombre: 'Bryan' });
        await Calculo.bulkCreate([
            { resultado: 10.5, usuarioId: usuario.id },
            { resultado: 21, usuarioId: usuario.id },
            { resultado: 31.5, usuarioId: usuario.id },
            { resultado: 42, usuarioId: usuario.id },
            { resultado: 52.5, usuarioId: usuario.id }
        ]);
        res.send('Base de datos poblada correctamente');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;