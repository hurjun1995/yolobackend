const {
  Account,
  Goal,
  GoalCategory,
  GoalSurvey,
  GoalSurveyQuestion,
  Question
} = require('../models');
const { to, TE } = require('./util.service');

// goalInfo: { goalID: "", name: "", logTime: '19:00', reminderMinute: 0 }
// surveys: list of { questionID: "", offeredAnswerID: -1, customAnswerText: "" }
// offeredAnswerID = -1 indicates provided answer is custom answer
module.exports.createGoal = async function(user, goalInfo, surveys) {
  const { name, logTime, reminderMinute } = goalInfo;

  let goal;
  let err;

  [err, goal] = await to(Goal.create({ name, log_time: logTime, reminder_minute: reminderMinute }));
  if (err) {
    TE(err.message);
  }

  surveys.map(async survey => {
    const { questionID, offeredAnswerID, customAnswerText } = survey;
    let goalSurvey;
    let goalSurveyQuestion;

    [err, goalSurvey] = await to(GoalSurvey.create());
    if (err) {
      TE(err.message);
    }

    goal.set(goalSurvey);

    [err, goalSurveyQuestion] = await to(
      GoalSurveyQuestion.create({ goal_survey_id: goalSurvey.id, question_id: questionID })
    );
    if (err) {
      TE(err.message);
    }
  });
};
