const { GOAL_SURVEY_QUESTION_OFFERED_ANSWER } = require("../constants");

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "goal_survey_question",
    {
      id: {
        type: DataTypes.SMALLINT,
        primaryKey: true
      },
      goal_survey_id: {
        type: DataTypes.SMALLINT
      },
      question_id: {
        type: DataTypes.SMALLINT
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    }
  );

  Model.associate = function(models) {
    this.OfferedAnswer = this.belongsToMany(models.OfferedAnswer, {
      through: GOAL_SURVEY_QUESTION_OFFERED_ANSWER,
      timestamps: false
    });
  };

  return Model;
};
