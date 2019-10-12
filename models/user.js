const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {

  let User = sequelize.define("User", {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }

  });

  // User.associate = function(models) {

  //   User.hasMany(models.Event, {

  //   });

  // };

  // User.associate = function(models) {

  //   User.hasMany(models.Invite, {

  //   });

  // };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;

};
