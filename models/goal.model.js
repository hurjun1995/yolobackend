module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "goal",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isIntrinsic: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.Account = this.belongsTo(models.Account, { foreignKey: "account_id" });
    this.GoalCategory = this.belongsTo(models.GoalCategory, {
      foreignKeys: "goal_category_id"
    });
  };

  return Model;
};
