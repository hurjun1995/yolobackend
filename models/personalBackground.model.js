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
      underscored: true,
      freezeTableName: true,
      timestamps: false
    }
  );

  Model.associate = function(models) {
    this.Account = this.belongsToMany(models.Account, {
      through: models.AccountPersonalBackground
    });
    this.PersonalBackgroundCategory = this.belongsTo(models.PersonalBackgroundCategory, {
      foreignKey: "type_id"
    });
  };

  return Model;
};
