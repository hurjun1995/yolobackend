module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
      'account_type',
      {
        id: {
            type: DataTypes.TINYINT,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING(30),
            unique: true
        }
      },
      {
        underscored: true,
        freezeTableName: true
      }
    );
  
    return Model;
};