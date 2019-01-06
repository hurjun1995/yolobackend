const { ExtractJwt, Strategy } = require("passport-jwt");
const { account } = require("../models");
const CONFIG = require("../config/config");
const { to } = require("../services/util.service");

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption;

  passport.use(
    new Strategy(opts, async function(jwtPayload, done) {
      let err, user;
      [err, user] = await to(account.findByPk(jwtPayload.account_id));
      if (err) return done(err, false);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );
};
