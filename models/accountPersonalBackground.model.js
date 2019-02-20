module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "account_personal_background",
    {
      account_id: {
        type: DataTypes.UUID,
        primaryKey: true
      },
      personal_background_id: {
        type: DataTypes.TINYINT,
        primaryKey: true
      },
      type_id: {
        type: DataTypes.TINYINT,
        primaryKey: true
      }
    },
    {
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.PersonalBackgroundCategory = this.belongsTo(models.PersonalBackgroundCategory, {
      foreignKey: "type_id"
    });
  };

  return Model;
};
