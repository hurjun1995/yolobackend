const authService = require("../services/auth.service");
const { to, ReE, ReS } = require("../services/util.service");

module.exports.create = async function(req, res) {
  const body = req.body;

  if (!body.unique_key && !body.email) {
    return ReE(res, "Please enter an email to register");
  } else if (!body.password) {
    return ReE(res, "Please enter a password to register");
  } else {
    let err, user;
    [err, user] = await to(authService.createUser(body));
    if (err) return ReE(res, err, 422);
    return ReS(res, { user: user.serialize() });
  }
};

module.exports.get = async function(req, res) {
  let user = req.user; // this user is User model object provided by passportJS
  return ReS(res, { user: user.serialize() });
};

module.exports.update = async function(req, res) {
  let user, data, err;
  user = req.user;
  data = req.body;
  user.set(data);

  [err, user] = await to(user.save());
  if (err) {
    return ReE(res, err);
  }
  return ReS(res, { message: `Updated User: ${user.email}` });
};

module.exports.remove = async function(req, res) {
  let user, err;
  user = req.user;

  [err, user] = await to(user.destroy());
  if (err) return ReE(res, "Error occured trying to delete the user");

  return ReS(res, { message: "Deleted User" }, 204);
};

module.exports.login = async function(req, res) {
  let err, user;
  [err, user] = await to(authService.authUser(req.body));
  if (err) return ReE(res, err, 402);

  return ReS(res, { token: user.getJWT(), user: user.serialize() });
};
