/**
 * group of accounts
 * each group can represent a study
 */

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'group',
    {
      id: {
        type: DataTypes.SMALLINT,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
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
      through: models.AccountGroup
    });
  };

  return Model;
};
