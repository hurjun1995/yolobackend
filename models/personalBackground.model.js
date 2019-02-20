module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "personal_background",
    {
      id: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.Account = this.belongsToMany(models.Account, {
      through: { model: models.AccountPersonalBackground },
      foreignKey: "personal_background_id"
    });
    this.PersonalBackgroundCategory = this.belongsTo(models.PersonalBackgroundCategory, {
      foreignKey: "type_id"
    });
  };

  return Model;
};
