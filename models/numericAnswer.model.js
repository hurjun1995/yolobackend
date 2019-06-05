module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'numeric_answer',
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      },
      value: {
        type: DataTypes.SMALLINT,
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
    this.PredefinedAnswer = this.belongsTo(models.PredefinedAnswer, {
      foreignKey: 'predefined_answer_id'
    });
  };

  return Model;
};
