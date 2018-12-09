module.export = (sequelize, DataTypes) => {
  var Model = sequelize.define("Goal", {
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
  });

  Model.associate = function(models) {
    this.User = this.belongsTo(models.User, { foreignKey: "userId" });
    this.GoalCategory = this.belongsTo(models.GaolCategory, {
      foreignKeys: "goalCategoryId"
    });
  };
};
