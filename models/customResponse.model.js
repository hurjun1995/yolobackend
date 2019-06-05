module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'custom_response',
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.TEXT
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.SurveyQuestionVersion = this.belongsTo(models.SurveyQuestionVersion, {
      foreignKey: 'survey_question_version_id'
    });
  };

  return Model;
};
