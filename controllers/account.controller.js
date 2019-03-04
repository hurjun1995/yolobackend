const authService = require('../services/auth.service');
const { to, ReE, ReS } = require('../services/util.service');

module.exports.create = async (req, res) => {
  const { body } = req;

  if (!body.email) {
    return ReE(res, 'Please enter an email to register');
  }
  if (!body.password) {
    return ReE(res, 'Please enter a password to register');
  }
  const [err, user] = await to(authService.createUser(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { user: user.serialize() });
};

module.exports.get = async (req, res) => {
  const { user } = req; // this user is User model object provided by passportJS
  return ReS(res, { user: user.serialize() });
};

module.exports.update = async (req, res) => {
  let err;
  let { user } = req;
  const data = req.body;
  user.set(data);

  [err, user] = await to(user.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { message: `Updated User: ${user.email}` });
};

module.exports.remove = async (req, res) => {
  let err;
  let { user } = req;

  [err, user] = await to(user.destroy());
  if (err) return ReE(res, 'Error occured trying to delete the user');

  return ReS(res, { message: 'Deleted User', id: user.id }, 202);
};

module.exports.login = async (req, res) => {
  const [err, user] = await to(authService.authUser(req.body));
  if (err) return ReE(res, err, 402);

  return ReS(res, { token: user.getJWT(), user: user.serialize() });
};
