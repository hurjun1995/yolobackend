module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'question',
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  return Model;
};
