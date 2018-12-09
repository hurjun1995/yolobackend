module.export = (sequelize, DataTypes) => {
  var Model = sequelize.define("Gender", {
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
    this.Users = this.hasMany(models.User, { foreignKey: "genderId" });
  };

  return Model;
};
