module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'question',
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
    this.GoalSurvey = this.belongsToMany(models.GoalSurvey, {
      through: models.GoalSurveyQuestion
    });
  };

  return Model;
};
