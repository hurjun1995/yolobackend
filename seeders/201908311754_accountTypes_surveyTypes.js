module.exports = {
    up: (queryInterface, _) => {
        return queryInterface.bulkInsert('account_type', [{
            type: 'admin'
        }, {
            type: 'participant'
        }])
        .then(queryInterface.bulkInsert('goal_category', [{
                name: 'Family'
            }, {
                name: 'Social'
            }, {
                name: 'Career'
            }, {
                name: 'Financial'
            }, {
                name: 'Spiritual'
            }, {
                name: 'Physical'
            }, {
                name: 'Intellectual'
            }])
        )
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;

        return queryInterface.bulkDelete('account_type', {
            type: {
                [Op.or]: ['admin', 'participant']
            }
        }, {})
        .then(queryInterface.bulkDelete('goal_category', {
                name: {
                    [Op.or]: ['Family', 'Social', 'Career', 'Intellectual',
                              'Financial', 'Spiritual', 'Physical']
                }
            })
        )
    }
}