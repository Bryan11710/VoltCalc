const express = require('express');
const { sequelize } = require('./models');
const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware para procesar datos JSON
app.use(express.json());

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('¡El backend de VoltCalc está funcionando!');
});

// Integración de rutas de la API
app.use('/api', apiRoutes);

const PORT = 3000;

sequelize.sync({ force: true }).then(() => {
    console.log('Base de datos sincronizada y tablas creadas');
    app.listen(PORT, () => {
        console.log(`VoltCalc API corriendo en http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Error al conectar a la BD:', err);
});