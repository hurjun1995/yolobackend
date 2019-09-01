module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'survey_type',
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING(40),
        unique: true
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    }
  );

  return Model;
};
