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
            type: DataTypes.TEXT
        }
      },
      {
        underscored: true,
        freezeTableName: true
      }
    );
  
    return Model;
};