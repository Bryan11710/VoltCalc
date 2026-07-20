module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        nombre: DataTypes.STRING
    });

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Calculo, { foreignKey: 'usuarioId' });
    };

    return Usuario;
};