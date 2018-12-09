module.export = (sequelize, DataTypes) => {
  var Model = sequelize.define("MarriageStatus", {
    id: {
      type: DataTypes.TINYINT,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  });

  Model.associate = function(models) {
    this.User = this.hasMany(models.User, { foreignKey: "marriageStatusId" });
  };

  return Model;
};
