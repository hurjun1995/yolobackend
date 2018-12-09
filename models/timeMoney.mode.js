module.export = (sequelize, DataTypes) => {
  var Model = sequelize.define("TimeMoney", {
    id: {
      type: DataTypes.TINYINT,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  Model.associate = function(models) {
    this.User = this.hasMany(models.User, { foreignKey: "timeMoneyId" });
  };

  return Model;
};
