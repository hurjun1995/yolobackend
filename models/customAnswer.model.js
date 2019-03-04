module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'custom_answer',
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.STRING
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = models => {
    this.GoalSurveyQuestion = this.belongsTo(models.GoalSurveyQuestion);
  };

  return Model;
};
