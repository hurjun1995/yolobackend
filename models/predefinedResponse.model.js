module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'predefined_response',
    {},
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.SurveyQuestionVersion = this.belongsTo(models.SurveyQuestionVersion, {
      foreignKey: 'survey_question_version_id'
    });
    this.PredefinedAnswer = this.belongsTo(models.PredefinedAnswer, {
      foreignKey: 'predefined_answer_id'
    });
  };

  return Model;
};
