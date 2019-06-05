module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'question_version_predefined_answer',
    {},
    {
      underscored: true,
      freezeTableName: true
    }
  );

  return Model;
};
