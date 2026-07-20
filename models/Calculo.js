module.exports = (sequelize, DataTypes) => {
    const Calculo = sequelize.define('Calculo', {
        resultado: DataTypes.FLOAT 
    });

    Calculo.associate = (models) => {
        Calculo.belongsTo(models.Usuario, { foreignKey: 'usuarioId' });
    };

    return Calculo;
};