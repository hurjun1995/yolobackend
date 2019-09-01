// this migration sets up:
// custom_response with association between survey_question_version and custom_response (1-M)
// predefined_response AS association between survey_question_version and predefined_answer (M-M)
// : this is called predefined_response

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('custom_response', {
        id: {
          type: Sequelize.SMALLINT,
          autoIncrement: true,
          primaryKey: true
        },
        text: {
          type: Sequelize.TEXT
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
        survey_question_version_id: {
          type: Sequelize.SMALLINT,
          references: {
            model: 'survey_question_version',
            key: 'id'
          }
        }
      })
      .then(() => {
        return queryInterface.createTable('predefined_response', {
          survey_question_version_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'survey_question_version',
              key: 'id'
            },
            primaryKey: true
          },
          predefined_answer_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'predefined_answer',
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
      .dropTable('predefined_response')
      .then(queryInterface.dropTable('custom_response'));
  }
};
