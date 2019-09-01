// this migration sets up:
// survey, survey_type
// survey_group association(M-M)

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('survey_type', {
        id: {
          type: Sequelize.SMALLINT,
          autoIncrement: true,
          primaryKey: true
        },
        type: {
          type: Sequelize.STRING(40),
          unique: true
        }
      })
      .then(() => {
        return queryInterface.createTable('survey', {
          id: {
            type: Sequelize.SMALLINT,
            autoIncrement: true,
            primaryKey: true
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          survey_type_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'survey_type',
              key: 'id'
            }
          }
        });
      })
      .then(() => {
        return queryInterface.createTable('survey_group', {
          survey_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'survey',
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
      .dropTable('survey_group')
      .then(queryInterface.dropTable('survey'))
      .then(queryInterface.dropTable('survey_type'));
  }
};
