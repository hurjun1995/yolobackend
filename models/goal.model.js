module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'goal',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      log_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      reminder_minute: {
        type: DataTypes.TINYINT,
        allowNull: false,
        validate: {
          validateReminderMinute(value) {
            const validMinutes = new Set([10, 20, 30, 40, 50, 60]);
            if (!validMinutes.has(value)) {
              throw new Error(`${value} isn't valid reminder minute: 10, 20, 30, 40, 50, 60`);
            }
          }
        }
      }
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.Account = this.belongsTo(models.Account, { foreignKey: 'account_id' });
    this.GoalCategory = this.belongsTo(models.GoalCategory, {
      foreignKeys: 'goal_category_id'
    });
  };

  return Model;
};
