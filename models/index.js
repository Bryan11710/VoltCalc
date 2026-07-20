'use strict';

const Sequelize = require('sequelize');
const dbConfig = require('../config/database.js');
const db = {};

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect
    }
);

// Importar modelos
db.Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
db.Calculo = require('./Calculo')(sequelize, Sequelize.DataTypes);

// Asociaciones
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;