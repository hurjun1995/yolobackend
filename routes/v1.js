const express = require("express");
const passport = require("passport");

const router = express.Router();
const UserController = require("../controllers/account.controller");

const registerJwtStragety = require("../middleware/passportJwt");

router.use(passport.initialize());
registerJwtStragety(passport);
router.get("/", function(req, res, next) {
  res.statusCode = 200;
  res.json({
    status: "success",
    message: "Listening for REST API calls...",
    data: { version_number: "v1.0.0.0" }
  });
});

router.get("/user", passport.authenticate("jwt", { session: false }), UserController.get);
router.put("/user", passport.authenticate("jwt", { session: false }), UserController.update);
router.delete("/user", passport.authenticate("jwt", { session: false }), UserController.remove);
router.post("/user", UserController.create);
router.post("/user/login", UserController.login);

module.exports = router;
