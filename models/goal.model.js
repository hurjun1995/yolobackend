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
    this.account = this.belongsTo(models.account, { foreignKey: "accountId" });
    this.goalcategory = this.belongsTo(models.goalcategory, {
      foreignKeys: "goalcategoryId"
    });
  };

  return Model;
};
