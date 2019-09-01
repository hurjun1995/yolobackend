module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('account_type', [{
            type: 'admin'
        }, {
            type: 'participant'
        }])
    },

    down: (queryInterface, Sequelize) => {
        const Op = Sequelize.Op;

        return queryInterface.bulkDelete('account_type', {
            type: {
                [Op.or]: ['admin', 'participant']
            }
        }, {});
    }
}