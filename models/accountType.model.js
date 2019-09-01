module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
      'account_type',
      {
        id: {
            type: Sequelize.TINYINT,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: Sequelize.TEXT
        }
      },
      {
        underscored: true,
        freezeTableName: true
      }
    );
  
    return Model;
};