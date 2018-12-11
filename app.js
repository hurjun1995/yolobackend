const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const pe = require("parse-error");
const cors = require("cors");

const CONFIG = require("./config/config");
const v1 = requires("./routes/v1");
const models = require("./models");
const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport
app.use(passport.initialize());

// Log Environment
console.log("Environment: ", CONFIG.app);

// DATABASE
models.sequelize
  .authenticate()
  .then(() => {
    console.log("Connectted to database: ", CONFIG.db_name);
  })
  .catch(err => {
    console.error("Unable to connect to database: ", CONFIG.db_name, err);
  });

// CORS
app.use(cors());

// Route initializer
app.use("/v1", v1);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "developement" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.export = app;

// This is here to handle all the uncaught promise rejections
process.on("unhandledRejection", err => {
  console.error("Uncaught Error", pe(error));
});
