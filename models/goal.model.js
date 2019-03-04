module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'goal',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.Account = this.belongsTo(models.Account, { foreignKey: 'account_id' });
    this.GoalCategory = this.belongsTo(models.GoalCategory, {
      foreignKeys: 'goal_category_id'
    });
  };

  return Model;
};
