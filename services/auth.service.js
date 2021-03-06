const models = require('../models');

const Account = models.Account;
const validator = require('validator');
const { to, TE } = require('./util.service');

module.exports.createUser = async function(userInfo) {
  _validateUserInfo(userInfo);
  let user;
  let err;
  [err, user] = await to(Account.create(userInfo));
  if (err) TE(err.message);

  return user;
};

module.exports.authUser = async function(userInfo) {
  _validateUserInfo(userInfo);
  let user;
  let err;
  [err, user] = await to(Account.findOne({ where: { email: userInfo.email } }));
  if (err) TE(err.message);

  if (!user) TE('Provided email is not registered');

  [err, user] = await to(user.comparePassword(userInfo.password));
  if (err) TE(err.message);

  return user;
};

/** Helper functions * */

const _validateUserInfo = function(userInfo) {
  if (!userInfo.email) TE('Please enter an email to login');
  if (!userInfo.password) TE('Please enter a password to login');
  if (!validator.isEmail(userInfo.email)) TE('Provided email has invalid format.');
};
