module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'survey_group',
    {},
    {
      underscored: true,
      freezeTableName: true
    }
  );

  return Model;
};
