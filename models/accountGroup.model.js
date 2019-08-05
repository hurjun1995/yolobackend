/**
 * many to many relationship between account and group
 */

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'account_group',
    {},
    {
      underscored: true,
      freezeTableName: true
    }
  );

  return Model;
};
