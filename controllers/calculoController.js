const { Calculo, Usuario } = require('../models');

// Controlador para obtener cálculos optimizados
exports.getAllCalculos = async (req, res) => {
    try {
        // Eager Loading: Trae el usuario asociado en una sola consulta
        const calculos = await Calculo.findAll({
            include: [{
                model: Usuario,
                attributes: ['id', 'nombre', 'email'] // Solo traemos los campos necesarios para LOPDP
            }]
        });

        res.status(200).json({
            status: 'success',
            data: calculos
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al recuperar cálculos',
            details: error.message
        });
    }
};