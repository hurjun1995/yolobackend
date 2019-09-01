const { Goal, GoalCategory} = require('../models');
const { to, TE } = require('./util.service');

module.exports.createGoal = async function(user, goalInfo) {
    // name, log_time, reminder_minute must be not null
    // this should be validated on frontend
    let err, goalCategory, goal;
    const { goal_name, log_time, reminder_minute, goal_category } = goalInfo;

    [err, goalCategory] = await to(GoalCategory.findOrCreate({where: {name: goal_category}}));
    if (err) TE(err.message);

    [err, goal] = await to(Goal.create({
        name: goal_name,
        log_time: log_time,
        reminder_minute: reminder_minute,
        account_id: user.id,
        goal_category_id: goalCategory.id
    }));
    if (err) TE(err.message);
  
    return goal;
  };