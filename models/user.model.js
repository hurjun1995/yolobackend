const bcrypt = require("bcrypt");
const bcrypt_p = require("bcrypt-promise");
const jwt = require();
const { TE, to } = require("../services/util.service");
const CONFIG = require("../config/config");

module.export = (sequelize, DataTypes) => {
  var Model = sequelize.define("User", {
    id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
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
    timeOrMoney: DataTypes.BOOLEAN,
    firstName: DataTypes.STRING
  });

  Model.associate = function(models) {
    this.Gender = this.belongsTo(models.Gender, { foreignKey: "genderId" });
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
      jwt.sign({ user_email: this.email }, CONFIG.jwt_encryption, { expiresIn: expiration_time })
    );
  };

  return Model;
};
