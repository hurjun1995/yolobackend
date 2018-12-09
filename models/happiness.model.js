module.export = (sequelize, DataTypes) => {
  var Model = sequelize.define("Happiness", {
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
  });

  Model.associate = function(models) {
    this.User = this.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Model;
};
