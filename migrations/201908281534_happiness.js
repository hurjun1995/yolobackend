// this migration sets up happiness and happiness-account association(M-1)

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('happiness', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      scale: {
        type: Sequelize.TINYINT,
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      account_id: {
        type: Sequelize.UUID,
        references: {
          model: 'account',
          key: 'id'
        }
      }
    });
  },

  down(queryInterface, _) {
    return queryInterface.dropTable('happiness');
  }
};
