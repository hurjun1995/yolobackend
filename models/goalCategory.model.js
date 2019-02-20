module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "goal_category",
    {
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
    },
    {
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.Goal = this.hasMany(models.Goal, { foreignKey: "goal_category_id" });
  };

  return Model;
};
