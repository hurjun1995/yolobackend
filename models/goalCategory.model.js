module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "goalcategory",
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
    this.goal = this.hasMany(models.goal, { foreignKey: "goalcategoryId" });
  };

  return Model;
};
