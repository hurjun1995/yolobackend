module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "marriagestatus",
    {
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
    },
    {
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.account = this.hasMany(models.account, { foreignKey: "marriagestatusId" });
  };

  return Model;
};
