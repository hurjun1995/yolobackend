module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'account_personal_background',
    {
      type_id: {
        type: DataTypes.TINYINT
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    }
  );

  Model.associate = function(models) {
    this.PersonalBackgroundCategory = this.belongsTo(models.PersonalBackgroundCategory, {
      foreignKey: 'type_id'
    });
  };

  return Model;
};
