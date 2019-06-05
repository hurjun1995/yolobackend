module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'question_version',
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      },
      version: {
        type: DataTypes.SMALLINT
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.Question = this.belongsTo(models.Question, { foreignKey: 'question_id' });
    this.Survey = this.belongsToMany(models.Survey, { through: models.SurveyQuestionVersion });
    this.PredefinedAnswer = this.belongsToMany(models.PredefinedAnswer, {
      through: models.QuestionVersionPredefinedAnswer
    });
  };

  return Model;
};
