module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'text_answer',
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false
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
