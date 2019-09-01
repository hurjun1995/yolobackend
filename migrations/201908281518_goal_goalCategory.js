// this migration sets up goal, goal_category, and goal-account association(M-1)

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('goal_category', {
        id: {
          type: Sequelize.TINYINT,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }
      })
      .then(() => {
        return queryInterface.createTable('goal', {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          log_time: {
            type: Sequelize.TIME,
            allowNull: false
          },
          reminder_minute: {
            type: Sequelize.TINYINT,
            allowNull: false
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          account_id: {
            type: Sequelize.UUID,
            references: {
              model: 'account',
              key: 'id',
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            }
          },
          goal_category_id: {
            type: Sequelize.TINYINT,
            references: {
              model: 'goal_category',
              key: 'id',
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL'
            }
          }
        });
      });
  },
  down(queryInterface, _) {
    return queryInterface.dropTable('goal').then(queryInterface.dropTable('goal_category'));
  }
};
