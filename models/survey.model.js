module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'survey',
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.SurveyType = this.belongsTo(models.SurveyType, { foreign_key: 'survey_type_id' });
    this.QuestionVersion = this.belongsToMany(models.QuestionVersion, {
      through: models.SurveyQuestionVersion
    });
    this.Group = this.belongsToMany(models.Group, {
      through: models.SurveyGroup
    });
  };

  return Model;
};
