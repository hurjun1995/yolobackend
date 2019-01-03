const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");
const jwt = require("jsonwebtoken");
const { TE, to } = require("../services/util.service");
const CONFIG = require("../config/config");

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "account",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: { msg: "email format invalid." } }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dob: DataTypes.DATEONLY,
      firstName: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.timemoney = this.belongsTo(models.timemoney, {
      foreignKey: "timemoneyId"
    });
    this.gender = this.belongsTo(models.gender, { foreignKey: "genderId" });
    this.race = this.belongsTo(models.race, { foreignKey: "raceId" });
    this.education = this.belongsTo(models.education, {
      foreignKey: "educationId"
    });
    this.marriagestatus = this.belongsTo(models.marriagestatus, {
      foreignKey: "marriagestatusId"
    });
    this.goal = this.hasMany(models.goal, { foreignKey: "accountId" });
    this.happiness = this.hasMany(models.happiness, {
      foreignKey: "accountId"
    });
  };

  Model.beforeSave(async (user, options) => {
    let err;
    if (user.changed("password")) {
      let salt, hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });

  Model.prototype.comparePassword = async function(providedPassword) {
    let err, pass;
    if (!this.password) TE("password not set");

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE("invalid password");

    return this;
  };

  Model.prototype.getJWT = function() {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return (
      "Bearer " +
      jwt.sign({ account_id: this.email }, CONFIG.jwt_encryption, {
        expiresIn: expiration_time
      })
    );
  };

  Model.prototype.serialize = function() {
    return this.toJSON();
  };

  return Model;
};
