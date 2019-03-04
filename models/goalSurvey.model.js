module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'goal_survey',
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
    this.Goal = this.belongsTo(models.Goal);
    this.Question = this.belongsToMany(models.Question, { through: models.GoalSurveyQuestion });
  };

  return Model;
};
