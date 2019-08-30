// this migration sets up:
// question, question_version,
// predefined_answer, text_answer, numeric_answer,
// association between question_version and predefined_answer,
// association between survey and survey_question

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface
      .createTable('question', {
        id: {
          type: Sequelize.SMALLINT,
          autoIncrement: true,
          primaryKey: true
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      })
      .then(() => {
        return queryInterface.createTable('question_version', {
          id: {
            type: Sequelize.SMALLINT,
            autoIncrement: true,
            primaryKey: true
          },
          version: {
            type: Sequelize.SMALLINT
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE,
          question_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'question',
              key: 'id'
            }
          }
        });
      })
      .then(() => {
        return queryInterface.createTable('predefined_answer', {
          id: {
            type: Sequelize.SMALLINT,
            autoIncrement: true,
            primaryKey: true
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE
        });
      })
      .then(() => {
        return queryInterface.createTable('text_answer', {
          id: {
            type: Sequelize.SMALLINT,
            autoIncrement: true,
            primaryKey: true
          },
          value: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          predefined_answer_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'predefined_answer',
              key: 'id'
            }
          }
        });
      })
      .then(() => {
        return queryInterface.createTable('numeric_answer', {
          id: {
            type: Sequelize.SMALLINT,
            autoIncrement: true,
            primaryKey: true
          },
          value: {
            type: Sequelize.SMALLINT,
            allowNull: false,
            unique: true
          },
          predefined_answer_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'predefined_answer',
              key: 'id'
            }
          }
        });
      })
      .then(() => {
        return queryInterface.createTable('question_version_predefined_answer', {
          predefined_answer_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'predefined_answer',
              key: 'id'
            },
            primaryKey: true
          },
          question_version_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'question_version',
              key: 'id'
            },
            primaryKey: true
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE
        });
      })
      .then(() => {
        return queryInterface.createTable('survey_question_version', {
          id: {
            type: Sequelize.SMALLINT,
            primaryKey: true
          },
          survey_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'survey',
              key: 'id'
            }
          },
          question_version_id: {
            type: Sequelize.SMALLINT,
            references: {
              model: 'question_version',
              key: 'id'
            }
          },
          created_at: Sequelize.DATE,
          updated_at: Sequelize.DATE
        });
      });
  },
  down(queryInterface, _) {
    return queryInterface
      .dropTable('survey_question_version')
      .then(queryInterface.dropTable('question_version_predefined_answer'))
      .then(queryInterface.dropTable('numeric_answer'))
      .then(queryInterface.dropTable('text_answer'))
      .then(queryInterface.dropTable('predefined_answer'))
      .then(queryInterface.dropTable('question_version'))
      .then(queryInterface.dropTable('question'));
  }
};
