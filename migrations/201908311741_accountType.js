// this migration sets up:
// account_type

module.exports = {
    up(queryInterface, Sequelize) {
      return queryInterface
        .createTable('account_type', {
          id: {
            type: Sequelize.TINYINT,
            autoIncrement: true,
            primaryKey: true
          },
          text: {
            type: Sequelize.TEXT
          }
        })
        .then(() => {
            return queryInterface.addColumn(
                "account",
                "account_type_id", {
                    type: Sequelize.TINYINT,
                    references: {
                        model: "account_type",
                        key: "id"
                    }
                })
        });
    },
    down(queryInterface, _) {
      return queryInterface
        .removeColumn("account", "account_type_id")
        .then(queryInterface.dropTable("account_type"));
    }
  };
  