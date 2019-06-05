module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'predefined_answer',
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
    this.QuestionVersion = this.belongsToMany(models.QuestionVersion, {
      through: models.QuestionVersionPredefinedAnswer
    });
  };

  return Model;
};
