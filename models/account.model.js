const bcrypt = require('bcrypt');
const bcryptPromise = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const { TE, to } = require('../services/util.service');
const CONFIG = require('../config/myConfig');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    'account',
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
        validate: { isEmail: { msg: 'email format invalid.' } }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dob: DataTypes.DATEONLY,
      firstName: DataTypes.STRING
    },
    {
      underscored: true,
      freezeTableName: true
    }
  );

  Model.associate = function(models) {
    this.Goal = this.hasMany(models.Goal, { foreignKey: 'account_id' });
    this.Happiness = this.hasMany(models.Happiness, {
      foreignKey: 'account_id'
    });
    this.group = this.belongsToMany(models.Group, {
      through: models.AccountGroup
    });
  };

  Model.beforeSave(async function(user, options) {
    let err;
    if (user.changed('password')) {
      let salt;
      let hash;
      [err, salt] = await to(bcrypt.genSalt(10));
      if (err) TE(err.message, true);

      [err, hash] = await to(bcrypt.hash(user.password, salt));
      if (err) TE(err.message, true);

      user.password = hash;
    }
  });

  Model.prototype.comparePassword = async function(providedPassword) {
    if (!this.password) TE('password not set');

    const [err, pass] = await to(bcryptPromise.compare(providedPassword, this.password));
    if (err) TE(err);

    if (!pass) TE('invalid password');

    return this;
  };

  Model.prototype.getJWT = function() {
    const expirationTime = parseInt(CONFIG.jwt_expiration);
    return `Bearer ${jwt.sign({ account_id: this.id }, CONFIG.jwt_encryption, {
      expiresIn: expirationTime
    })}`;
  };

  Model.prototype.serialize = function() {
    return { id: this.id, email: this.email };
  };

  return Model;
};
