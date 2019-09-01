const { to, ReE, ReS } = require('../services/util.service')
const goalService = require('../services/goal.service')

module.exports.create = async (req, res) => {
    const { user, body } = req;

    const [err, goal] = await to(goalService.createGoal(user, body));
    if (err) {
        return ReE(res, err, 422);
    }

    return ReS(res, {message: `${goal.name} is created`});
}