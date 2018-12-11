const express = require("express");
const passport = require("passport");

const router = express.Router();
const UserController = require("../controllers/user.controller");

router.get("/user", passport.authenticate("jwt", { session: false }), UserController.get);
router.put("/user", passport.authenticate("jwt", { session: false }), UserController.update);
router.delete("/user", passport.authenticate("jwt", { session: false }), UserController.remove);
router.post("/user", UserController.create);
router.post("/user/login", UserController.login);
