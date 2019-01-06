module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "timemoney",
    {
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
    },
    {
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.account = this.hasMany(models.account, { foreignKey: "timemoneyId" });
  };

  return Model;
};
