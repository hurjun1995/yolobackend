const { GOAL_SURVEY_QUESTION_OFFERED_ANSWER } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "offered_answer",
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.GoalSurveyQuestion = this.belongsToMany(models.GoalSurveyQuestion, {
      through: GOAL_SURVEY_QUESTION_OFFERED_ANSWER,
      timestamps: false
    });
  };

  return Model;
};
