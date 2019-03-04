module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'goal_category',
    {
      id: {
        type: DataTypes.TINYINT,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: false
    }
  );

  Model.associate = models => {
    this.Goal = this.hasMany(models.Goal, { foreignKey: 'goal_category_id' });
  };

  return Model;
};
