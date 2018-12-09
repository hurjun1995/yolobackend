module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define("GoalCategory", {
    id: {
      type: DataTypes.TINYINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });

  Model.associate = function(models) {
    this.Goal = this.hasMany(models.Goal, { foreignKey: "goalId" });
  };

  return Model;
};
