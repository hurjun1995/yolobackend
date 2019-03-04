module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'happiness',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      scale: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: { min: 0, max: 10 }
      }
      // createdAt is used as loggedAt
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.Account = this.belongsTo(models.Account, { foreignKey: 'account_id' });
  };

  return Model;
};
