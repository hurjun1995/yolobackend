/**
 * group of accounts
 * each group can represent a study
 * first group with id 1 should be "every account"
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
    this.Survey = this.belongsToMany(models.Survey, {
      through: models.SurveyGroup
    });
  };

  return Model;
};
