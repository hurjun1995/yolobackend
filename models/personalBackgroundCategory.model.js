module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "personal_background_category",
    {
      id: {
        type: DataTypes.TINYINT,
        primaryKey: true
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.AccountPersonalBackground = this.hasMany(models.AccountPersonalBackground, {
      foreignKey: "type_id"
    });
    this.PersonalBackground = this.hasMany(models.PersonalBackground, {
      foreignKey: "type_id"
    });
  };

  return Model;
};
