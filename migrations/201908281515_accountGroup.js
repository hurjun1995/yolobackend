// this migration sets up:
// account, group
// account_group association (M-M)

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('account', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        dob: Sequelize.DATEONLY,
        first_name: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      })
      .then(() => {
        return queryInterface.createTable('group', {
          id: {
            type: Sequelize.SMALLINT,
            autoIncrement: true,
            primaryKey: true
          },
          name: {
            type: Sequelize.STRING
          }
        });
      })
      .then(() => {
        return queryInterface.createTable('account_group', {
          account_id: {
            type: Sequelize.UUID,
            references: {
              model: 'account',
              key: 'id'
            },
            primaryKey: true
          },
          group_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'group',
              key: 'id'
            },
            primaryKey: true
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE
        });
      });
  },
  down(queryInterface, _) {
    return queryInterface
      .dropTable('account_group')
      .then(queryInterface.dropTable('group'))
      .then(queryInterface.dropTable('account'));
  }
};
