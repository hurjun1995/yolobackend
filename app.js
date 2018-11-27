const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");
const pe = require("parse-error");
const cors = require("cors");

const v1 = requires("./routes/v1");
const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Passport
app.use(passport.initialize());

app.listen(8020);
console.log("node server listening to the port 8020...");
