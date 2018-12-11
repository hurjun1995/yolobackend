module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "happiness",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      scale: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: { min: 0, max: 10 }
      }
      // createdAt is used as loggedAt
    },
    {
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.account = this.belongsTo(models.account, { foreignKey: "accountId" });
  };

  return Model;
};
