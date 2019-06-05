module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'survey_question_version',
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true
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
